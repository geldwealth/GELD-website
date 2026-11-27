import type { Metadata } from "next";
import React, { Suspense } from "react";
import styles from "../../shared/subpageShell.module.css";
import Background from "../../components/Background/Background";
import Products from "../../components/Products/Products";
import { MINI_STOCK_PORTFOLIOS_NAME } from "../../data/catalogProducts";

export const metadata: Metadata = {
  title: "Expert-Picked Stock Portfolios",
  description: "Mini stock portfolios managed by experienced Indian fund managers, for investors who want less stress.",
  alternates: { canonical: "/products/mini-stock-portfolio" },
  openGraph: { title: "Expert-Picked Stock Portfolios | GELD Wealth", description: "Mini stock portfolios managed by experienced Indian fund managers, for investors who want less stress.", url: "/products/mini-stock-portfolio" },
};

export default function IapProductPage() {
  return (
    <div className={styles.container}>
      <Background />
      <Suspense
        fallback={
          <div style={{ color: "#ffffff", padding: "100px", textAlign: "center" }}>
            Loading {MINI_STOCK_PORTFOLIOS_NAME}...
          </div>
        }
      >
        <Products mode="detail" defaultProduct={MINI_STOCK_PORTFOLIOS_NAME} />
      </Suspense>
    </div>
  );
}
