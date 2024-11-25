export async function POST(request: Request) {
  const body = await request.json();
  const { url, method, params, isBulkExecutor, data, authToken } = body;

  if (!url) {
    return new Response("Missing required field: 'url'", {
      status: 400,
    });
  }

  if (!method) {
    return new Response("Missing required field: 'method'", {
      status: 400,
    });
  }

  let fetchUrl = url;

  if (params) {
    const queryParams = new URLSearchParams(params);
    fetchUrl = `${url}?${queryParams.toString()}`;
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "API-Tester/1.0",
    Authorization: authToken,
  };

  const fetchData = async (
    url: string,
    method: string,
    requestData: unknown
  ) => {
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: method === "GET" ? null : JSON.stringify(requestData),
      });

      const responseBody = await response.json();
      return {
        data: responseBody,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: { error: "Failed to fetch" }, status: 500 };
    }
  };

  if (!isBulkExecutor) {
    const response = await fetchData(fetchUrl, method, data);
    return Response.json([response], { status: response.status });
  }
  if (isBulkExecutor && Array.isArray(data)) {
    try {
      const responses = await Promise.all(
        data.map((item) => fetchData(fetchUrl, method, item))
      );
      return Response.json(
        responses.filter((res) => res),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error processing bulk requests:", error);
      return new Response("Error processing bulk requests", { status: 500 });
    }
  }

  return new Response("Invalid request data", { status: 400 });
}
