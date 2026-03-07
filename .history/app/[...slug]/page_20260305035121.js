import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation"; // 1. Імпортуй це!

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return notFound();
  }

  const uri = `/${slug.join("/")}`;
  const data = await getPage(uri);

  // 2. Якщо WordPress повернув null (сторінки не існує)
  if (!data) {
    console.log(`Page not found in WP for URI: ${uri}`);
    return notFound(); // Це викличе стандартну сторінку 404
  }

  // 3. Якщо дані є, рендеримо блоки
  // Переконайся, що ти передаєш саме масив блоків.
  // Якщо getPage повертає { blocks: [...] }, то пиши data.blocks
  return <BlockRenderer blocks={data.blocks || data} />;
}
