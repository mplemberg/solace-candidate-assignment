import db from "../../../db";
import { advocates } from "../../../db/schema";
import { SQL, eq, or, ilike, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search");

  let data;

  if (searchTerm) {
    data = await db
      .select()
      .from(advocates)
      .where(
        or(
          ilike(advocates.firstName, `%${searchTerm}%`),
          ilike(advocates.lastName, `%${searchTerm}%`),
          ilike(advocates.city, `%${searchTerm}%`),
          ilike(advocates.degree, `%${searchTerm}%`),
          sql`${advocates.specialties}::text ILIKE ${`%${searchTerm}%`}`,
          sql`CAST(${
            advocates.yearsOfExperience
          } AS TEXT) ILIKE ${`%${searchTerm}%`}`
        )
      );
  } else {
    data = await db.select().from(advocates);
  }

  return Response.json({ data });
}
