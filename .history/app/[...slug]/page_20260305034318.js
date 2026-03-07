import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";

export default async function Page({ params }) {
  console.log(params?.slug);
  const data = await getPage(params?.slug.join("/"));
  console.log("data");
  return <BlockRenderer blocks={data} />;
}
