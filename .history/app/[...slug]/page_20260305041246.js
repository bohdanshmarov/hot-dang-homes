import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return notFound();
  }

  const uri = `/${slug.join("/")}`;
  const data = await getPage(uri);

  console.log("WP DATA FOR", uri, ":", data);

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return notFound();
  }

  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const uri = `/${slug.join("/")}`;

  const seo = await getPageSeo(uri);
  return {
    title: seo.title,
    description: seo.metaDesc,
  };
}
