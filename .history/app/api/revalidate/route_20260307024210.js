import { revalidatePath } from "next/cache";

async function handler() {
	revalidatePath()
}

export { handler as POST, handler as GET };
