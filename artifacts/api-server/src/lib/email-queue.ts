import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logger } from "./logger";

const artifactDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const dataDir = path.join(artifactDir, "data");
const queueFile = path.join(dataDir, "email-queue.json");

type QueuedMail = {
  id: string;
  method: "sendContactNotification" | "sendConfirmationEmail";
  payload: Record<string, unknown>;
  createdAt: string;
  retries: number;
};

async function ensureQueueFile(): Promise<void> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(queueFile);
  } catch {
    await fs.writeFile(queueFile, JSON.stringify([], null, 2), "utf8");
  }
}

export async function enqueueMail(
  method: QueuedMail["method"],
  payload: QueuedMail["payload"],
): Promise<void> {
  await ensureQueueFile();
  const item: QueuedMail = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    method,
    payload,
    createdAt: new Date().toISOString(),
    retries: 0,
  };

  const tmpFile = `${queueFile}.tmp`;
  const raw = await fs.readFile(queueFile, "utf8").catch(() => "[]");
  const parsed = JSON.parse(raw) as QueuedMail[];
  parsed.push(item);
  await fs.writeFile(tmpFile, JSON.stringify(parsed, null, 2), "utf8");
  await fs.rename(tmpFile, queueFile);
}

export async function drainEmailQueue(): Promise<void> {
  try {
    await ensureQueueFile();
    const raw = await fs.readFile(queueFile, "utf8");
    const items = JSON.parse(raw) as QueuedMail[];

    if (!Array.isArray(items) || items.length === 0) {
      return;
    }

    logger.info({ count: items.length }, "Replay email queue");
    const remaining: QueuedMail[] = [];

    for (const item of items) {
      try {
        if (item.method === "sendContactNotification") {
          await sendContactNotificationWithPayload(item.payload);
        }
        if (item.method === "sendConfirmationEmail") {
          await sendConfirmationEmailWithPayload(item.payload);
        }
      } catch (err) {
        item.retries += 1;
        if (item.retries < 3) {
          remaining.push(item);
        } else {
          logger.error({ err, id: item.id }, "Drop email queue item after retries");
        }
      }
    }

    const tmpFile = `${queueFile}.tmp`;
    await fs.writeFile(tmpFile, JSON.stringify(remaining, null, 2), "utf8");
    await fs.rename(tmpFile, queueFile);
  } catch (err) {
    logger.error({ err }, "Failed to drain email queue");
  }
}

async function sendContactNotificationWithPayload(payload: Record<string, unknown>): Promise<void> {
  const { sendContactNotification } = await import("./email");
  await sendContactNotification(
    String(payload.type ?? "unknown"),
    {
      fullName: String(payload.fullName ?? ""),
      email: String(payload.email ?? ""),
      phone: typeof payload.phone === "string" ? payload.phone : null,
      subject: typeof payload.subject === "string" ? payload.subject : null,
      message: typeof payload.message === "string" ? payload.message : null,
      metadata:
        payload.metadata && typeof payload.metadata === "object"
          ? (payload.metadata as Record<string, unknown>)
          : {},
    },
  );
}

async function sendConfirmationEmailWithPayload(payload: Record<string, unknown>): Promise<void> {
  const { sendConfirmationEmail } = await import("./email");
  const to = typeof payload.email === "string" ? payload.email : "";
  const fullName = typeof payload.fullName === "string" ? payload.fullName : "";
  await sendConfirmationEmail(to, fullName);
}