import { Router } from "express";
import { db } from "@workspace/db";
import { blogTable } from "@workspace/db";
import { GetBlogPostParams } from "@workspace/api-zod";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/blog", async (_req, res) => {
  const posts = await db
    .select()
    .from(blogTable)
    .orderBy(desc(blogTable.publishedAt));
  res.json(
    posts.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags),
      publishedAt: p.publishedAt.toISOString(),
    }))
  );
});

router.get("/blog/:slug", async (req, res) => {
  const parsed = GetBlogPostParams.safeParse({ slug: req.params.slug });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }
  const [post] = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.slug, parsed.data.slug));
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({
    ...post,
    tags: JSON.parse(post.tags),
    publishedAt: post.publishedAt.toISOString(),
  });
});

export default router;
