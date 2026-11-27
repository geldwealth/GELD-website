import type { Metadata } from "next";
import React from "react";
import styles from "../shared/subpageShell.module.css";
import Background from "../components/Background/Background";
import Webinar from "../components/Webinar/Webinar";
import { getWebinarPoster } from "../lib/webinarPoster";

export const metadata: Metadata = {
  title: "Free Weekly Webinar",
  description: "Join GELD’s free live webinar every Saturday at 11am. Ask your money questions to experienced fund managers.",
  alternates: { canonical: "/webinar" },
  openGraph: { title: "Free Weekly Webinar | GELD Wealth", description: "Join GELD’s free live webinar every Saturday at 11am. Ask your money questions to experienced fund managers.", url: "/webinar" },
};

export const revalidate = 60;

export default async function WebinarPage() {
  const webinarPoster = await getWebinarPoster();

  return (
    <div className={styles.container}>
      <Background />
      <Webinar
        isSubpage
        posterSrc={webinarPoster.src}
        posterAlt={webinarPoster.alt}
        details={webinarPoster.details}
      />
    </div>
  );
}
