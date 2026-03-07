import { getPage } from "utils/getPage";

export default async function Home() {
  const data = await getPage();
  return <div>Hellow World</div>;
}
