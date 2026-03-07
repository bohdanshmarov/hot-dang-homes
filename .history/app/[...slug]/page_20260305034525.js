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

  // Якщо твоя функція getPage повертає об'єкт { blocks, title }, беремо data.blocks
  // Якщо вона повертає тільки масив блоків, залиш просто data
  return <BlockRenderer blocks={data.blocks || data} />;
}