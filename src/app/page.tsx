import HomeClient from "./components/HomeClient/HomeClient";
import { getWebinarPoster } from "./lib/webinarPoster";
import { getLatestSocial } from "./lib/socialPosts";

export const revalidate = 60;

export default async function Home() {
  const [webinarPoster, latestSocial] = await Promise.all([
    getWebinarPoster(),
    getLatestSocial(),
  ]);

  return <HomeClient webinarPoster={webinarPoster} latestSocial={latestSocial} />;
}
