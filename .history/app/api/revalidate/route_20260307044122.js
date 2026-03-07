import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function handler(request) {
  // Помилка 1: У тебе була зайва лапка "'/" -> має бути "/"
  // Помилка 2: "layout" оновлює взагалі все дерево сайту (це добре для меню, але важкувато)
  revalidatePath("/", "layout"); 
  
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export { handler as POST, handler as GET };