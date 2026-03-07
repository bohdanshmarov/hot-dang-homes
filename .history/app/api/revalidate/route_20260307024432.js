import { revalidatePath } from "next/cache";

async function handler(request) {
  revalidatePath("'/", "layout");
	return nextR
}

export { handler as POST, handler as GET };
