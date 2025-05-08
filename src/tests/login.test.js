// use the login route to test the login functionality
import assert from "node:assert"
import test from "node:test"

test('login successfully', async () => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'cajero1',
      password: 'cajero123'
    })
  })
  assert.equal(response.status, 200)
})

test('login unsuccessfully', async () => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'gerente',
      password: 'wrongpassword'
    })
  })
  assert.equal(response.status, 400)
})