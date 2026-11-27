import type { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../shared/subpageShell.module.css";
import Background from "../components/Background/Background";
import Products from "../components/Products/Products";

export const metadata: Metadata = {
  title: "What We Offer",
  description: "Public and private equity, mutual funds, loans and insurance, chosen for your goals from one steady plan.",
  alternates: { canonical: "/products" },
  openGraph: { title: "What We Offer | GELD Wealth", description: "Public and private equity, mutual funds, loans and insurance, chosen for your goals from one steady plan.", url: "/products" },
};

export default function ProductsPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Suspense fallback={<div style={{ color: "#ffffff", padding: "100px", textAlign: "center" }}>Loading Vaults...</div>}>
        <Products mode="catalog" />
      </Suspense>
    </div>
  );
}
