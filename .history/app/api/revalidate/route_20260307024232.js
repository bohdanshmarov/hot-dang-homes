import { revalidatePath } from "next/cache";

async function handler(req) {
  revalidatePath("'/", "layout");
}

export { handler as POST, handler as GET };
