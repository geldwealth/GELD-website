import type { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../shared/subpageShell.module.css";
import Background from "../../components/Background/Background";
import Products from "../../components/Products/Products";

export const metadata: Metadata = {
  title: "Mutual Funds",
  description: "Diversification, simplified. Mutual fund plans chosen for your goals, reviewed with you over time.",
  alternates: { canonical: "/products/mutual-funds" },
  openGraph: { title: "Mutual Funds | GELD Wealth", description: "Diversification, simplified. Mutual fund plans chosen for your goals, reviewed with you over time.", url: "/products/mutual-funds" },
};

export default function MutualFundsProductPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Suspense fallback={<div style={{ color: "#ffffff", padding: "100px", textAlign: "center" }}>Loading Mutual Funds Details...</div>}>
        <Products mode="detail" defaultProduct="Mutual Funds" />
      </Suspense>
    </div>
  );
}
