import { Download, Github } from "lucide-react";

export function MainSection() {
  return (
    <section className='py-24 px-4 text-center '>
      <div className='container mx-auto max-w-6xl'>
        <h1 className='text-4xl md:text-7xl font-bold mb-6 text-zinc-800 animate-fade-in-down'>
          Welcome to <span className='text-green-500 underline'>Reqium</span>
        </h1>
        <p className='md:text-xl sm:text-md mb-8 max-w-2xl mx-auto animate-fade-in'>
          Streamline your API testing with Reqium, the powerful Chrome extension
          that makes API requests faster, simpler, and more enjoyable.
        </p>
        <div className='flex md:flex-row sm:flex-col-reverse justify-center items-center gap-4 mb-12'>
          <a
            href='https://chromewebstore.google.com/detail/reqium/cjfaackekpmoogobcbfkpfncjkmibhbo'
            className='flex items-center animate-shimmer
         rounded-lg border border-zinc-800 contrast-125
          bg-[linear-gradient(110deg,#18181b,45%,#555651,55%,#18181b)] bg-[length:200%_100%]
           px-4 py-3 font-bold text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
          >
            <Download className='mr-2 h-4 w-4' /> Download Extension
          </a>
          <a
            href='https://github.com/AnujChhikara/ReqiumAPI'
            className='bg-transparent border rounded-xl px-4 py-3 flex items-center  hover:text-white duration-500 font-bold border-black hover:bg-black'
          >
            <Github className='mr-2 h-4 w-4' /> View on GitHub
          </a>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left'>
          <FeatureCard
            title='Bulk API Requests'
            description='Send multiple requests at once to save time and increase productivity.'
          />
          <FeatureCard
            title='Advanced Customization'
            description='Tailor each request to your needs with custom headers, parameters, and more.'
          />
          <FeatureCard
            title='Quick Diagnostics'
            description='Instantly troubleshoot errors and analyze responses to speed up your workflow.'
          />
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
    <div className='bg-green-100 p-6 min-w-80 rounded-lg shadow-xl'>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-zinc-700 font-semibold'>{description}</p>
    </div>
  );
}
