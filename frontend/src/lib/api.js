const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

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
      const err = new Error(data.detail || "Request failed");
      err.status = response.status;
      throw err;
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

async function uploadRequest(path, file, token) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || "Upload failed");
  return data;
}

export const api = {
  // Auth
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),

  // Destinations
  destinations: () => request("/destinations"),
  destination: (id) => request(`/destinations/${id}`),
  createDestination: (payload, token) =>
    request("/destinations", { method: "POST", body: payload, token }),

  // Bookings
  createBooking: (payload, token) => request("/bookings", { method: "POST", body: payload, token }),
  myBookings: (token) => request("/bookings/me", { token }),

  // Favorites
  myFavorites: (token) => request("/favorites/me", { token }),
  addFavorite: (destinationId, token) => request(`/favorites/${destinationId}`, { method: "POST", token }),
  removeFavorite: (destinationId, token) =>
    request(`/favorites/${destinationId}`, { method: "DELETE", token }),

  // Dashboard
  dashboard: (token) => request("/dashboard/me", { token }),

  // File upload
  uploadFile: (file, token) => uploadRequest("/upload", file, token),
  assetUrl: (url) => {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    return `${API_ORIGIN}${url.startsWith("/") ? url : `/${url}`}`;
  },

  // Blog posts
  createBlog: (payload, token) => request("/blogs", { method: "POST", body: payload, token }),
  listBlogs: ({ destinationId, sort = "date" } = {}) => {
    const params = new URLSearchParams();
    if (destinationId) params.set("destination_id", destinationId);
    if (sort) params.set("sort", sort);
    const query = params.toString();
    return request(`/blogs${query ? `?${query}` : ""}`);
  },
  getBlog: (id) => request(`/blogs/${id}`),
  listPendingBlogs: (token) => request("/blogs/pending", { token }),
  updateBlogStatus: (id, status, token) =>
    request(`/blogs/${id}/status`, { method: "PATCH", body: { status }, token }),

  // Comments
  createComment: (destinationId, content, token) =>
    request(`/destinations/${destinationId}/comments`, { method: "POST", body: { content }, token }),
  listComments: (destinationId) => request(`/destinations/${destinationId}/comments`),
  editComment: (commentId, content, token) =>
    request(`/comments/${commentId}`, { method: "PATCH", body: { content }, token }),
  deleteComment: (commentId, token) =>
    request(`/comments/${commentId}`, { method: "DELETE", token }),
};
