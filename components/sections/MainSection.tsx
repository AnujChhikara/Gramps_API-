import { Button } from "@/components/ui/button";

export function MainSection() {
  return (
    <section className='py-20 px-4 text-center bg-black text-white'>
      <h1 className='text-4xl md:text-6xl font-bold mb-6'>Welcome to Reqium</h1>
      <p className='text-xl mb-8 max-w-2xl mx-auto'>
        Simplify your API testing with our powerful Chrome extension. Reqium
        makes API requests easy and efficient.
      </p>
      <Button size='lg' className='bg-purple-600 hover:bg-purple-700'>
        Download Extension
      </Button>
    </section>
  );
}
