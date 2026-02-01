import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("tipdrip");

    const url = new URL(req.url);
    const accountId = url.searchParams.get('accountId');

    if (!accountId) {
      return new Response(JSON.stringify({ error: "Missing accountId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const history = await db
      .collection('tip-history')
      .find({ stripeAccountId: accountId })
      .toArray();

    return new Response(JSON.stringify(history), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
