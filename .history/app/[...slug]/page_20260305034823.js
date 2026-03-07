import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;

  // Перетворюємо масив на рядок "/contact-us"
  const uri = `/${slug.join("/")}`;

  console.log("URI string:", uri); // Тепер тут буде "/contact-us"

  const data = await getPage(uri);

  if (!data) {
    return notFound();
  }

  // Передаємо чистий масив блоків
  return <BlockRenderer blocks={data} />;
}
