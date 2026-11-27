import type { Metadata } from "next";

import BlogArticlePage from "@/components/resources/blog-article-page";
import { blogArticles } from "@/components/resources/blogs-content";

const post = blogArticles[4];
const related = blogArticles.filter((article) => article.slug !== post.slug);

export const metadata: Metadata = {
  title: `${post.title} · Shuroq`,
  description: post.excerpt,
};

export default function ArticleRoute() {
  return <BlogArticlePage post={post} related={related} />;
}
