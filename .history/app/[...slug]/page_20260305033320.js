import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";

export default async function Page({params}) {
  const data = await getPage(params.slug.join());
  console.log("data");
  return <BlockRenderer blocks={data} />;
}
