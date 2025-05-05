import db from "../../../db";
import { advocates } from "../../../db/schema";
import { or, ilike, sql, and, gt } from "drizzle-orm";
import { AdvocatesResponse } from "../../../types/api-responses";

function encodeCursor(id: number): string {
  return Buffer.from(JSON.stringify({ id })).toString("base64");
}

function decodeCursor(cursor: string): { id: number } | null {
  try {
    return JSON.parse(Buffer.from(cursor, "base64").toString());
  } catch (error) {
    return null;
  }
}

function createSearchCondition(term: string) {
  return or(
    ilike(advocates.firstName, `%${term}%`),
    ilike(advocates.lastName, `%${term}%`),
    ilike(advocates.city, `%${term}%`),
    ilike(advocates.degree, `%${term}%`),
    sql`${advocates.specialties}::text ILIKE ${`%${term}%`}`,
    sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${`%${term}%`}`
  );
}

function buildWhereClause(
  searchTerm: string | null,
  cursor: { id: number } | null
) {
  const conditions = [];

  if (searchTerm) {
    conditions.push(createSearchCondition(searchTerm));
  }

  if (cursor?.id) {
    conditions.push(gt(advocates.id, cursor.id));
  }

  return conditions.length > 0
    ? conditions.length === 1
      ? conditions[0]
      : and(...conditions)
    : undefined;
}

async function fetchTotalCount(searchTerm: string | null) {
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates)
    .where(searchTerm ? createSearchCondition(searchTerm) : undefined);

  return countResult[0]?.count || 0;
}

async function fetchAdvocates(whereClause: any, limit: number) {
  return db
    .select()
    .from(advocates)
    .where(whereClause)
    .orderBy(advocates.id)
    .limit(limit + 1);
}

function formatAdvocateRecords(records: any[]) {
  return records.map((advocate) => ({
    ...advocate,
    id: advocate.id.toString(),
    specialties: Array.isArray(advocate.specialties)
      ? advocate.specialties
      : [],
    createdAt: advocate.createdAt || undefined,
  }));
}

function buildPaginationMetadata(
  data: any[],
  limit: number,
  totalCount: number
) {
  const hasNextPage = data.length > limit;
  const records = hasNextPage ? data.slice(0, limit) : data;
  const nextCursor =
    records.length > 0 ? encodeCursor(records[records.length - 1].id) : null;

  return {
    data: records,
    hasNextPage,
    nextCursor,
    totalCount,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search");
  const limit = parseInt(searchParams.get("limit") || "9", 10);
  const encodedCursor = searchParams.get("cursor") || null;
  const cursor = encodedCursor ? decodeCursor(encodedCursor) : null;

  const whereClause = buildWhereClause(searchTerm, cursor);

  const [data, totalCount] = await Promise.all([
    fetchAdvocates(whereClause, limit),
    fetchTotalCount(searchTerm),
  ]);

  const {
    data: records,
    hasNextPage,
    nextCursor,
  } = buildPaginationMetadata(data, limit, totalCount);

  const response: AdvocatesResponse = {
    data: formatAdvocateRecords(records),
    pagination: {
      total: totalCount,
      hasNextPage,
      nextCursor,
    },
  };

  return Response.json(response);
}
