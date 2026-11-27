import type { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../shared/subpageShell.module.css";
import Background from "../../components/Background/Background";
import Products from "../../components/Products/Products";

export const metadata: Metadata = {
  title: "Life and Health Insurance",
  description: "Protect first, then grow. Get help choosing the right life and health cover for your family.",
  alternates: { canonical: "/products/insurance" },
  openGraph: { title: "Life and Health Insurance | GELD Wealth", description: "Protect first, then grow. Get help choosing the right life and health cover for your family.", url: "/products/insurance" },
};

export default function InsuranceProductPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Suspense fallback={<div style={{ color: "#ffffff", padding: "100px", textAlign: "center" }}>Loading Insurance Details...</div>}>
        <Products mode="detail" defaultProduct="Insurance" />
      </Suspense>
    </div>
  );
}
