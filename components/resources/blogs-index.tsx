"use client";

import { BlogGrid } from "@/components/arc/blocks/blog-grid/blog-grid";

import { blogCategories, blogIndexPosts } from "./blogs-content";

/**
 * The grid links each card to its article route, so the link builder has to
 * live on the client.
 */
export function BlogsIndex() {
  return (
    <BlogGrid
      title="Insights and engineering notes"
      description="Product engineering, platform engineering, SRE, DevSecOps and observability — written by the teams that run this in production."
      posts={blogIndexPosts}
      categories={blogCategories}
      getHref={(post) => `/blogs/${post.id}`}
      pageSize={6}
    />
  );
}
