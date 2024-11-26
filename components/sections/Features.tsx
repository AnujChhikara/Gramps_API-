import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className='py-20 px-4 flex items-center justify-center'>
      <div className='max-w-5xl bg-gradient-to-r from-green-50 via-green-200 to-green-50 p-8 rounded-xl'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Key Features of Our Service
        </h2>
        <div className='grid md:grid-cols-3 gap-8'>
          <Card className='bg-white '>
            <CardHeader>
              <CardTitle className='text-black text-xl font-bold'>
                Easy API Testing
              </CardTitle>
            </CardHeader>
            <CardContent className='text-zinc-600 font-semibold text-sm'>
              Effortlessly send API requests across various endpoints with just
              a few clicks. Our platform supports all major HTTP methods—GET,
              POST, PUT, DELETE, PATCH—and allows you to easily configure the
              parameters and body for seamless testing.
            </CardContent>
          </Card>
          <Card className='bg-white '>
            <CardHeader>
              <CardTitle className='text-black text-xl font-bold'>
                Bulk Executor
              </CardTitle>
            </CardHeader>
            <CardContent className='text-zinc-600 font-semibold text-sm'>
              Test multiple API endpoints simultaneously with the innovative
              Bulk Executor feature. This allows developers to execute a series
              of requests in bulk, saving time and effort during the testing
              process, especially when working with large data sets.
            </CardContent>
          </Card>
          <Card className='bg-white '>
            <CardHeader>
              <CardTitle className='text-black text-xl font-bold'>
                Response Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className='text-zinc-600 font-semibold text-sm'>
              Gain deep insights into your API responses. Our platform provides
              detailed information, including status codes, response times, and
              formatted JSON outputs. Quickly spot performance issues, errors,
              and bottlenecks to enhance the debugging process.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
