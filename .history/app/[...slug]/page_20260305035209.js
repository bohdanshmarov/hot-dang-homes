import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation"; // 1. Імпортуй це!

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return notFound();

  const uri = `/${slug.join("/")}`;
  const data = await getPage(uri);

  console.log("WP DATA FOR", uri, ":", data);

  // ВИПРАВЛЕНА ПЕРЕВІРКА:
  // Якщо data — це null, АБО якщо це масив і він порожній
  if (!data || (Array.isArray(data) && data.length === 0)) {
    console.log("No data found, showing 404...");
    return notFound();
  }

  return <BlockRenderer blocks={data} />;
}
