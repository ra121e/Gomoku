import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function POST() {
  try {
    const match = await prisma.match.create({
      data: {},
    });
    return Response.json({
      id: match.id,
      status: match.status,
      createdAt: match.createdAt,
    });
  } catch (error) {
    return Response.json(
      {
        error: "failed_to_create_room",
        detail: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
