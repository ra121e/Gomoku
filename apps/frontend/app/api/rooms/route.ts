export const dynamic = "force-dynamic";

type CreateRoomBackendSuccess = {
  id?: string;
  roomId?: string;
};

type CreateRoomBackendError = {
  error?: string;
  detail?: string;
  message?: string;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

async function parseJsonSafely<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function POST() {
  const backendUrl = process.env.BACKEND_INTERNAL_URL ?? "http://backend:3001";

  try {
    const response = await fetch(`${backendUrl}/api/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorPayload =
        await parseJsonSafely<CreateRoomBackendError>(response);

      return Response.json(
        {
          error: errorPayload?.error ?? "failed_to_create_room",
          detail:
            errorPayload?.detail ??
            errorPayload?.message ??
            `Backend responded with status ${response.status}`,
        },
        {
          status: response.status,
        },
      );
    }

    const successPayload =
      await parseJsonSafely<CreateRoomBackendSuccess>(response);
    const roomId = successPayload?.roomId ?? successPayload?.id;

    if (!roomId) {
      return Response.json(
        {
          error: "invalid_backend_response",
          detail: "room id is missing in backend response",
        },
        {
          status: 502,
        },
      );
    }

    return Response.json(
      {
        roomId,
      },
      {
        status: response.status,
      },
    );
  } catch (error) {
    return Response.json(
      {
        error: "failed_to_create_room",
        detail: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}
