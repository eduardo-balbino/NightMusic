"use client";

import { useEffect, useState } from "react";

export default function TestFetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://localhost:3000/users");
      const json = await res.json();

      setData(json);
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Resposta da API</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}