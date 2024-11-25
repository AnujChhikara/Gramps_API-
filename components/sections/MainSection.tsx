import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github } from "lucide-react";

export function MainSection() {
  return (
    <section className='py-24 px-4 text-center bg-gradient-to-r from-zinc-500 via-stone-600 to-zinc-900 text-white'>
      <div className='container mx-auto max-w-4xl'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down'>
          Welcome to <span className='text-zinc-300'>Reqium</span>
        </h1>
        <p className='text-xl mb-8 max-w-2xl mx-auto animate-fade-in'>
          Simplify your API testing with our powerful Chrome extension. Reqium
          makes API requests easy, efficient, and enjoyable.
        </p>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mb-12'>
          <Button
            size='lg'
            className='bg-stone-700 hover:bg-stone-800  text-white shadow-md border border-zinc-500 shadow-stone-300 duration-700'
          >
            <Download className='mr-2 h-4 w-4' /> Download Extension
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='bg-transparent hover:bg-white hover:text-black text-white border-white'
          >
            <Github className='mr-2 h-4 w-4' /> View on GitHub
          </Button>
        </div>
        <div className='grid md:grid-cols-3 gap-8 text-left'>
          <FeatureCard
            title='Easy to Use'
            description='Intuitive interface for seamless API testing, even for beginners.'
          />
          <FeatureCard
            title='Powerful Features'
            description='Advanced request customization, response analysis, and more.'
          />
          <FeatureCard
            title='Time-Saving'
            description='Automate repetitive tasks and boost your productivity.'
          />
        </div>
        <div className='mt-12'>
          <Button
            size='lg'
            variant='link'
            className='text-zinc-300 hover:text-white'
          >
            Learn More <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='bg-zinc-800 bg-opacity-50 p-6 rounded-lg shadow-md border border-zinc-700'>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-zinc-300'>{description}</p>
    </div>
  );
}
