import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogTable = pgTable("blog", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").notNull().default("[]"),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  readingTime: integer("reading_time").notNull().default(5),
});

export const insertBlogSchema = createInsertSchema(blogTable).omit({ id: true });
export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogTable.$inferSelect;
