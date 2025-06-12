import db from "../../../../db";
import { advocates } from "../../../../db/schema";
import { sql, ilike, or } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.toLowerCase() ?? "";

        if (!q) {
            const data = await db.select().from(advocates);
            return Response.json({ data });
        }

        const data = await db
            .select()
            .from(advocates)
            .where(
                or(
                    ilike(advocates.firstName, `%${q}%`),
                    ilike(advocates.lastName, `%${q}%`),
                    ilike(advocates.city, `%${q}%`),
                    ilike(advocates.degree, `%${q}%`),
                    // sql`EXISTS (
                    // SELECT 1 FROM jsonb_array_elements(${
                    //     advocates.specialties
                    // }) AS elem
                    // WHERE elem::text ILIKE ${`%${q}%`}
                    // )`,
                    sql`${advocates.yearsOfExperience}::text ILIKE ${`%${q}%`}`
                )
            );

        return Response.json({ data });
    } catch (error) {
        return Response.json(
            { error: "Failed to search advocates." },
            { status: 500 }
        );
    }
}
