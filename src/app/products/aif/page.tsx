import type { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../shared/subpageShell.module.css";
import Background from "../../components/Background/Background";
import Products from "../../components/Products/Products";

export const metadata: Metadata = {
  title: "Private Equity: Pre-IPO Access",
  description: "Private equity through AIFs for experienced investors. Exclusive pre-IPO entry not available in the grey market.",
  alternates: { canonical: "/products/aif" },
  openGraph: { title: "Private Equity: Pre-IPO Access | GELD Wealth", description: "Private equity through AIFs for experienced investors. Exclusive pre-IPO entry not available in the grey market.", url: "/products/aif" },
};

export default function AifProductPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Suspense fallback={<div style={{ color: "#ffffff", padding: "100px", textAlign: "center" }}>Loading AIF Details...</div>}>
        <Products mode="detail" defaultProduct="AIF" />
      </Suspense>
    </div>
  );
}
