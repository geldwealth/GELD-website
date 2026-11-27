import type { Metadata } from "next";
import React from "react";
import styles from "../shared/subpageShell.module.css";
import Background from "../components/Background/Background";
import FundManagers from "../components/FundManagers/FundManagers";

export const metadata: Metadata = {
  title: "Fund Managers",
  description: "Meet the experienced Indian fund managers you can access through GELD, without needing to pick stocks yourself.",
  alternates: { canonical: "/fund-managers" },
  openGraph: { title: "Fund Managers | GELD Wealth", description: "Meet the experienced Indian fund managers you can access through GELD, without needing to pick stocks yourself.", url: "/fund-managers" },
};

export default function FundManagersPage() {
  return (
    <div className={styles.container}>
      <Background />
      <FundManagers isSubpage />
    </div>
  );
}
