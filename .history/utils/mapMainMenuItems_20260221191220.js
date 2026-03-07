import { v4 as uuid } from "uuid";

export const mapMainMenuItems = (menuItems) => {
  if (!menuItems || menuItems.length === 0) return [];

  return menuItems.map((item) => {
    const mainData = item?.menuItem;

    return {
      id: uuid(),
      // Теперь берем данные из правильного места
      label: mainData?.label || "No Label",
      destination: mainData?.destination?.uri || "#",

      // Саб-меню у тебя в GraphQL лежат в items на том же уровне
      subMenuItems: (item?.items || []).map((sub) => ({
        id: uuid(),
        label: sub?.label || "No Label",
        destination: sub?.destination?.uri || "#",
      })),
    };
  });
};
