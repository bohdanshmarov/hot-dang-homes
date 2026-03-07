import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function handler(request) {
 
  revalidatePath("/", "layout"); 
  
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export { handler as POST, handler as GET };