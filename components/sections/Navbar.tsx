import { Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className='w-full  h-16 sticky top-0 z-50 lg:px-4 px-2 backdrop-filter backdrop-blur-xl  bg-gradient-to-r from-zinc-500 via-stone-600 to-zinc-900
     text-white bg-opacity-5'
    >
      <div className='sm:p-3 p-2  mx-auto h-full flex items-center justify-between gap-2'>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-8'>
            <div className='sm:flex '>
              <Link href='/' className='flex items-center'>
                <div className='flex space-x-2 items-center'>
                  <svg
                    fill='#000000'
                    className='fill-white w-10'
                    viewBox='0 0 512 512'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <title>ionicons-v5-l</title>
                    <path d='M336,336H32a16,16,0,0,1-14-23.81l152-272a16,16,0,0,1,27.94,0l152,272A16,16,0,0,1,336,336Z' />
                    <path d='M336,160a161.07,161.07,0,0,0-32.57,3.32L377.9,296.59A48,48,0,0,1,336,368H183.33A160,160,0,1,0,336,160Z' />
                  </svg>
                  <h1 className='text-2xl font-bold text-white relative z-10'>
                    Reqium
                  </h1>
                </div>
              </Link>
            </div>

            <div className='lg:flex hidden items-center gap-5 text-sm font-medium text-muted-foreground'>
              <Link
                href='/login'
                className='text-sm font-medium text-zinc-200 hover:text-zinc-300'
              ></Link>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex items-center space-x-2'>
            <a
              href='https://github.com/AnujChhikara'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github size={28} className='text-white' />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
