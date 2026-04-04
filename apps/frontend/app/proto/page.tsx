"use client";

import { useState } from "react";
import { RoomCreateButton } from "../../components/proto/RoomCreateButton";

export default function ProtoPage() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSuccess(nextRoomId: string) {
    setRoomId(nextRoomId);
    setError(null);
  }

  function handleError(message: string) {
    setError(message);
    setRoomId(null);
  }

  return (
    <main className="shell">
      <section className="panel">
        <article className="card">
          <RoomCreateButton onSuccess={handleSuccess} onError={handleError} />
          {roomId ? <p>roomId: {roomId}</p> : null}
          {error ? <p role="alert">error: {error}</p> : null}
        </article>
      </section>
    </main>
  );
}
