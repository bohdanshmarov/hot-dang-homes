export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return notFound();
  }

  const uri = `/${slug.join("/")}`;

  console.log("Requesting URI from WordPress:", uri);

  const data = await getPage(uri);

  if (!data) {
    return notFound();
  }

  return <BlockRenderer blocks={data.blocks || data} />;
}
