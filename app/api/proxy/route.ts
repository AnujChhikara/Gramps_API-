export async function POST(request: Request) {
  const body = await request.json();
  const { url, method, params, isBulkExecutor, data, authToken } = body;

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

  let fetchUrl = url;

  if (params) {
    const queryParams = new URLSearchParams(params);
    fetchUrl = `${url}?${queryParams.toString()}`;
  }

  if (!isBulkExecutor) {
    const responseArray: Array<{ data: unknown; status: number }> = [];

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

      const responseBody = await response.json();

      if (!response.ok) {
        const res = {
          data: responseBody,
          status: response.status,
        };
        responseArray.push(res);
      } else {
        const res = {
          data: responseBody,
          status: response.status,
        };
        responseArray.push(res);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    if (responseArray.length > 0) {
      return Response.json(responseArray, { status: 200 });
    } else {
      return new Response("No valid responses", { status: 500 });
    }
  }
  // Bulk Executor
  if (isBulkExecutor) {
    const responseArray: Array<{ data: unknown; status: number }> = [];
    for (const item of data) {
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            "Content-Type": "application/json", // Default content type is JSON
            Accept: "application/json", // Default accepted response type is JSON
            "User-Agent": "API-Tester/1.0", // Optional: Set a default user-agent
            Authorization: authToken,
          },
          method: method,
          body: method === "GET" ? null : JSON.stringify(item),
        });
        const responseBody = await response.json();

        if (!response.ok) {
          const res = {
            data: responseBody,
            status: response.status,
          };
          responseArray.push(res);
        } else {
          const res = {
            data: responseBody,
            status: response.status,
          };
          responseArray.push(res);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (responseArray.length > 0) {
      return Response.json(responseArray, { status: 200 });
    } else {
      return new Response("No valid responses", { status: 500 });
    }
  }
}
