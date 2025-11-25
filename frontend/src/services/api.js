const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function signupUser({ fullName, email, password }) {
  const payload = {
    username: fullName.trim(),
    email: email.trim(),
    password,
  };

  const data = await request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (data.token) {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ id: data.id, username: data.username, email: data.email })
    );
  }

  return data;
}

export async function loginUser({ identifier, password }) {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier: identifier.trim(), password }),
  });

  if (data.token) {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ id: data.id, username: data.username, email: data.email })
    );
  }

  return data;
}

export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
}

