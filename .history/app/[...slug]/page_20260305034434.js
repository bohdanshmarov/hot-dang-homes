import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  // 1. ЧЕКАЄМО params, бо це Promise
  const resolvedParams = await params;

  // 2. Беремо slug (якщо його немає, наприклад на головній, буде [])
  const slug = resolvedParams?.slug;

  if (!slug) {
    return notFound();
  }

  console.log("Current slug array:", slug);

  // 3. Передаємо рядок у getPage
  const data = await getPage(slug.join("/"));

  if (!data) {
    return notFound();
  }

  return <BlockRenderer blocks={data.blocks} />;
}
