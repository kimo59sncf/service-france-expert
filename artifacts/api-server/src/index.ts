import app from "./app";
import { drainEmailQueue } from "./lib/email-queue";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"] ?? "5000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});

// Retry sending emails that were queued during downtime
drainEmailQueue().catch((err) => {
  logger.error({ err }, "Failed to drain email queue on startup");
});
