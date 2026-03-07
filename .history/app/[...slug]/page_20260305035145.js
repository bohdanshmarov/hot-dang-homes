import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation"; // 1. Імпортуй це!

export default async function Page({ params }) {
  const { slug } = await params;
  const uri = `/${slug.join("/")}`;

  const data = await getPage(uri);

  // ДЕБАГ: Подивись у термінал (не в браузер!), що тут приходить
  console.log("WP DATA FOR", uri, ":", data);

  if (!data || (data.blocks && data.blocks.length === 0)) {
    console.log("Triggering notFound()");
    return notFound();
  }

  return <BlockRenderer blocks={data.blocks || data} />;
}
