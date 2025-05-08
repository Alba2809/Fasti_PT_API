import assert from "node:assert";
import test from "node:test";

test("get all logs like a gerente", async () => {
  // Step 1: Login
  const loginResponse = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "cajero1",
      password: "cajero123",
    }),
  });

  // Extract the token from the cookie
  const rawCookie = loginResponse.headers.get("set-cookie");
  assert.ok(rawCookie, "No se recibió la cookie");

  // Extrae solo el valor "token=..."
  const tokenCookie = rawCookie.split(";")[0];

  const logResponse = await fetch("http://localhost:4000/api/log", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": tokenCookie, // ✅ así se envía la cookie
    },
  });

  console.log(logResponse.status, await logResponse.text());
  assert.equal(logResponse.status, 200);
});
