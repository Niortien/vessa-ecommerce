// app/api/test/route.ts
export async function GET() {
  console.log("✅ API /api/test exécutée !");
  return new Response(JSON.stringify({ message: "API OK" }), {
    headers: { "Content-Type": "application/json" },
  });
}
