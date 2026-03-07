import { BlockRenderer } from "components/BlockRenderer";
import { getPage } from "utils/getPage";

export default async function Page({ params }) {
  // Додаємо перевірку: якщо slug немає, використовуємо порожній рядок або "/"
  const slugArray = params?.slug || []; 
  const slugPath = Array.isArray(slugArray) ? slugArray.join("/") : slugArray;

  const data = await getPage(slugPath);
  
  if (!data) return <div>Сторінку не знайдено</div>;

  return <BlockRenderer blocks={data} />;
}