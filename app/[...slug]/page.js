import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { getPageSeo } from "utils/getPageSeo";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return notFound();
  }

  const uri = `/${slug.join("/")}`;
  const data = await getPage(uri);

  console.log("WP DATA FOR", uri, ":", data);

  // ВИПРАВЛЕНО: прибрали перевірку на порожній масив.
  // Тепер 404 буде ТІЛЬКИ якщо сторінки взагалі немає в базі (data === null)
  if (!data) {
    return notFound();
  }

  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const uri = `/${slug.join("/")}`;

  const seo = await getPageSeo(uri);

  // Додаємо захист, якщо SEO дані не прийшли
  return {
    title: seo?.title || "Default Title",
    description: seo?.metaDesc || "Default Description",
  };
}
