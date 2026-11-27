import type { Metadata } from "next";
import React from "react";

import Background from "../components/Background/Background";
import BlogHero from "../components/Blog/BlogHero";
import BlogList from "../components/Blog/BlogList";
import styles from "../shared/subpageShell.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Plain-English market insights and money guides from the GELD team in Mumbai.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | GELD Wealth", description: "Plain-English market insights and money guides from the GELD team in Mumbai.", url: "/blog" },
};

export const revalidate = 60;

export default function BlogPage() {
  return (
    <div className={styles.container}>
      <Background />
      <BlogHero />
      <BlogList />
    </div>
  );
}
