"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Blog.module.css";
import ScrollButton from "../ScrollButton/ScrollButton";

interface BlogProps {
  ref?: React.RefObject<HTMLElement | null>;
  onScrollDown?: () => void;
  isSubpage?: boolean;
  [key: string]: any;
}

export default function Blog({ ref, onScrollDown, isSubpage }: BlogProps) {
  const [isVisible, setIsVisible] = useState(false);
  const fallbackRef = useRef<HTMLElement>(null);
  const activeRef = ref || fallbackRef;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const current = activeRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [activeRef]);

  return (
    <section
      ref={activeRef}
      className={`${styles.aboutSection} ${isSubpage ? styles.aboutSectionSubpage : ""} ${isVisible ? styles.revealed : ""}`}
    >
      <div className={`${styles.statementWrapper} ${isSubpage ? styles.statementWrapperSubpage : ""}`}>
        <div className={styles.aboutContainer}>
          {/* Badge */}
          <div className={styles.aboutBadge}>
            <span className={styles.aboutBadgeText}>Research & Insights</span>
          </div>

          {/* Main Paragraph */}
          <p className={styles.aboutText}>
            <span className={styles.serifItalic}>Less noise, more clarity.</span>{" "}
            <span className={styles.fadeText}>Every week we look at what moved the markets and what Indians are searching about money,</span>{" "}
            <span className={styles.highlightText}>and explain what it means for your money in plain language.</span>{" "}
            <span className={styles.fadeText}>Read, check your plan, and invest with a calmer mind.</span>
          </p>
        </div>
      </div>

      {onScrollDown && (
        <div className={styles.scrollWrapper}>
          <ScrollButton onClick={onScrollDown} darkText={false} />
        </div>
      )}
    </section>
  );
}
