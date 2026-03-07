import { revalidatePath } from "next/cache";

async function handler() {
  revalidatePath("'/", "layout");
}

export { handler as POST, handler as GET };
