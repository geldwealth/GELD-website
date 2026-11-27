import type { Metadata } from "next";
import React from "react";
import styles from "../shared/subpageShell.module.css";
import Background from "../components/Background/Background";
import Docs from "../components/Docs/Docs";

export const metadata: Metadata = {
  title: "Privacy Policy and Documents",
  description: "GELD’s privacy policy, disclaimers and important documents.",
  alternates: { canonical: "/docs" },
  openGraph: { title: "Privacy Policy and Documents | GELD Wealth", description: "GELD’s privacy policy, disclaimers and important documents.", url: "/docs" },
};

export default function DocsPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Docs isSubpage />
    </div>
  );
}
