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

  // PROMENA OVDE:
  // Proveravamo samo da li je data null (što znači da stranica ne postoji u WP)
  // Ne proveravamo više .length === 0, pa će prazna stranica proći
  if (!data) {
    return notFound();
  }

  return <BlockRenderer blocks={data} />;
}
