import { getPage } from "../utils/getPage";

export default async function Home() {
  const data = await getPage("/");
  console.log("data");
  return <Block/>;
}
