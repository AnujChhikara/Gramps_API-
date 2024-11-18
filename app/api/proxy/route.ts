export async function POST(request: Request) {
  const body = await request.json();
  const { url, method, params, isNexusCast, data, authToken } = body;

  //Basic validation
  if (!url) {
    return new Response("Missing required field: 'url'", {
      status: 400, // 400 Bad Request
    });
  }

  if (!method) {
    return new Response("Missing required field: 'method'", {
      status: 400, // 400 Bad Request
    });
  }

  if (Array.isArray(data) && isNexusCast) {
    console.log(data);
  }
  let fetchUrl = url;

  if (params) {
    const queryParams = new URLSearchParams(params);
    fetchUrl = `${url}?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(fetchUrl, {
      headers: {
        "Content-Type": "application/json", // Default content type is JSON
        Accept: "application/json", // Default accepted response type is JSON
        "User-Agent": "API-Tester/1.0", // Optional: Set a default user-agent
        Authorization: authToken,
      },
      method: method,
      body: method === "GET" ? null : JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(errorData || "Unknown error", {
        status: response.status,
      });
    }

    const responseData = await response.json();
    return Response.json(responseData, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return new Response("An error occurred", { status: 500 });
  }
}
