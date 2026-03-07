import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import {}

export default async function Home() {
  const data = await getPage("/");
  if(!data) {

	}
  return <BlockRenderer blocks={data} />;
}
