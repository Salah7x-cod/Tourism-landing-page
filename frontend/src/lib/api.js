const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

function buildHeaders(token, hasBody = false) {
  const headers = {};
  if (hasBody) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request(path, { method = "GET", body, token, timeoutMs = 1500 } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: buildHeaders(token, Boolean(body)),
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 204) return null;

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.detail || "Request failed");
    }
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),
  destinations: () => request("/destinations"),
  destination: (id) => request(`/destinations/${id}`),
  createDestination: (payload, token) =>
    request("/destinations", { method: "POST", body: payload, token }),
  createBooking: (payload, token) => request("/bookings", { method: "POST", body: payload, token }),
  myBookings: (token) => request("/bookings/me", { token }),
  myFavorites: (token) => request("/favorites/me", { token }),
  addFavorite: (destinationId, token) => request(`/favorites/${destinationId}`, { method: "POST", token }),
  removeFavorite: (destinationId, token) =>
    request(`/favorites/${destinationId}`, { method: "DELETE", token }),
  dashboard: (token) => request("/dashboard/me", { token }),
};
