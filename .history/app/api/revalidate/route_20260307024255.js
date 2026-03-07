import { revalidatePath } from "next/cache";

async function handler(request) {
  revalidatePath("'/", "layout");
}

export { handler as POST, handler as GET };
