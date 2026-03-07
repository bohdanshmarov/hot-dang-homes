import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";

export default async function Page({ params }) {
  const slugArray = params?.slug || [];
  const slugPath = Array.isArray(slugArray) ? slugArray.join("/") : slugArray;

  const data = await getPage(slugPath);
  console.log(data);
  if (!data) return <div>Сторінку не знайдено</div>;

  return <BlockRenderer blocks={data} />;
}
