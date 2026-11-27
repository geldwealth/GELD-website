import type { Metadata } from "next";
import React from "react";
import styles from "../shared/subpageShell.module.css";
import Background from "../components/Background/Background";
import About from "../components/About/About";

export const metadata: Metadata = {
  title: "Why GELD Exists",
  description: "A Lower Parel, Mumbai team giving steady, honest money advice in every market, so you can invest calmly and stay invested.",
  alternates: { canonical: "/about" },
  openGraph: { title: "Why GELD Exists | GELD Wealth", description: "A Lower Parel, Mumbai team giving steady, honest money advice in every market, so you can invest calmly and stay invested.", url: "/about" },
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <Background />
      <About />
    </div>
  );
}