import type { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../shared/subpageShell.module.css";
import Background from "../../components/Background/Background";
import Products from "../../components/Products/Products";

export const metadata: Metadata = {
  title: "Personal and Professional Loans",
  description: "The right personal or professional loan without the runaround. Compare options with the GELD team.",
  alternates: { canonical: "/products/loans" },
  openGraph: { title: "Personal and Professional Loans | GELD Wealth", description: "The right personal or professional loan without the runaround. Compare options with the GELD team.", url: "/products/loans" },
};

export default function LoansProductPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Suspense fallback={<div style={{ color: "#ffffff", padding: "100px", textAlign: "center" }}>Loading Loans Details...</div>}>
        <Products mode="detail" defaultProduct="Loans" />
      </Suspense>
    </div>
  );
}
