import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className='py-20 px-4 bg-black text-white'>
      <h2 className='text-3xl font-bold text-center mb-12'>Key Features</h2>
      <div className='grid md:grid-cols-3 gap-8 '>
        <Card className='bg-zinc-900 border-zinc-800 '>
          <CardHeader>
            <CardTitle>Easy API Testing</CardTitle>
          </CardHeader>
          <CardContent>
            Make API requests with just a few clicks. Support for all HTTP
            methods.
          </CardContent>
        </Card>
        <Card className='bg-zinc-900 border-zinc-800'>
          <CardHeader>
            <CardTitle>Bulk Executor</CardTitle>
          </CardHeader>
          <CardContent>
            Test multiple API endpoints simultaneously with our unique Bulk
            Executor feature.
          </CardContent>
        </Card>
        <Card className='bg-zinc-900 border-zinc-800'>
          <CardHeader>
            <CardTitle>Response Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            Detailed response information including status codes, timing, and
            formatted JSON output.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
