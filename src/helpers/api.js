import { BACKEND_URL } from "../data";

async function get(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return { error: "Internal Error Server" };
    });
}

export async function getCitiesRequest(query) {
  return await get(`${BACKEND_URL}/cities${query ? `?${query}` : ""}`);
}
