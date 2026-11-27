import type { Metadata } from "next";
import React from "react";
import styles from "../shared/subpageShell.module.css";
import Background from "../components/Background/Background";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import { getLatestSocial } from "../lib/socialPosts";

export const metadata: Metadata = {
  title: "GELD on Social Media",
  description: "Latest money tips and market notes from GELD on Instagram and LinkedIn.",
  alternates: { canonical: "/socialmedia" },
  openGraph: { title: "GELD on Social Media | GELD Wealth", description: "Latest money tips and market notes from GELD on Instagram and LinkedIn.", url: "/socialmedia" },
};

export const revalidate = 60;

export default async function SocialMediaPage() {
  const latest = await getLatestSocial();
  return (
    <div className={styles.container}>
      <Background />
      <SocialMedia isSubpage latest={latest} />
    </div>
  );
}
