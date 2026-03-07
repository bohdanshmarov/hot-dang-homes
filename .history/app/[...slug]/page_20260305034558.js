import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  // 1. Пряма перевірка без await (для Next.js 13/14)
  const slug = params?.slug;

  if (!slug || !Array.isArray(slug)) {
    return notFound();
  }

  // 2. Робимо рядок зі слешем на початку
  const uri = `/${slug.join("/")}`;

  console.log("Fetching URI:", uri);

  // 3. Отримуємо дані
  const data = await getPage(uri);

  if (!data) {
    return notFound();
  }

  // 4. Рендеримо (якщо getPage повертає блоки напряму)
  return <BlockRenderer blocks={data} />;
}
