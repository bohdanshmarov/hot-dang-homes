import { getPage } from "utils/getPage";

export default async function Home() {
  const data = await getPage("/");
	console.error.log
  return <div>Hellow World</div>;
}
