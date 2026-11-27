import React, { Suspense } from "react";
import styles from "../../shared/subpageShell.module.css";
import Background from "../../components/Background/Background";
import Products from "../../components/Products/Products";

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
