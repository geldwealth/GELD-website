import type { Metadata } from "next";
import React from "react";
import styles from "../shared/subpageShell.module.css";
import Background from "../components/Background/Background";
import Performance from "../components/Performance/Performance";

export const metadata: Metadata = {
  title: "Performance",
  description: "How GELD approaches portfolio reporting. Past performance does not guarantee future returns.",
  alternates: { canonical: "/performance" },
  openGraph: { title: "Performance | GELD Wealth", description: "How GELD approaches portfolio reporting. Past performance does not guarantee future returns.", url: "/performance" },
};

export default function PerformancePage() {
  return (
    <div className={styles.container}>
      <Background />
      <Performance isSubpage />
    </div>
  );
}
