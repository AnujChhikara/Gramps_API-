export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return new Response("Missing required field: 'email'", {
      status: 400,
    });
  }

  return new Response("joined waitlist", { status: 200 });
}
