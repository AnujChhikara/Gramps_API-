export async function POST(request: Request) {
  const body = await request.json();
  const { url, headers, method, params, isNexusCast, data, authToken } = body;
  if (Array.isArray(data) && isNexusCast) {
    console.log(data);
  }
  console.log("api hit");
  console.log(typeof data);

  const fetchHeaders = {
    Authorization: `${authToken ?? ""}`,
    ContentType: "application/json",
    ...headers,
  };

  let fetchUrl = url;

  if (params) {
    const queryParams = new URLSearchParams(params);
    fetchUrl = `${url}?${queryParams.toString()}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: fetchHeaders,
  };

  if (["POST", "PUT", "PATCH"].includes(method)) {
    fetchOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fetchUrl, fetchOptions);
    const responseData = await response.json();
    return Response.json(responseData, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return new Response("An error occurred", { status: 500 });
  }
}
