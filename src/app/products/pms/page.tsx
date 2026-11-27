import type { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../shared/subpageShell.module.css";
import Background from "../../components/Background/Background";
import Products from "../../components/Products/Products";

export const metadata: Metadata = {
  title: "Professionally Managed Stock Portfolios",
  description: "Concentrated, professionally managed stock portfolios for experienced investors, with clear reporting.",
  alternates: { canonical: "/products/pms" },
  openGraph: { title: "Professionally Managed Stock Portfolios | GELD Wealth", description: "Concentrated, professionally managed stock portfolios for experienced investors, with clear reporting.", url: "/products/pms" },
};

export default function PmsProductPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Suspense fallback={<div style={{ color: "#ffffff", padding: "100px", textAlign: "center" }}>Loading PMS Details...</div>}>
        <Products mode="detail" defaultProduct="PMS" />
      </Suspense>
    </div>
  );
}
