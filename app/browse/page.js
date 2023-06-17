'use client';

import { useRouter } from 'next/navigation';
import MovieCard from '@/components/MovieCard';

export default function browse() {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push('/');
  };

  return (
    <div>
      <div className='bg-[url(https://images.alphacoders.com/131/1316404.jpg)] w-full h-screen bg-no-repeat bg-cover'>
        <div className='backdrop-brightness-50 w-full h-full'>
          {/* Nav Bar */}
          <nav className='bg-white border-gray-200 dark:bg-transparent'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 '>
              <a className='flex items-center'>
                <img
                  onClick={handleNavigateToHome}
                  src='https://i.ibb.co/WkQkvHn/logo.png'
                  className='h-full w-20 hover:cursor-pointer '
                  alt='Logo'
                />
              </a>
              <div className='block w-auto'>
                <button
                  type='button'
                  className='text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none '
                >
                  Log out
                </button>
              </div>
            </div>
          </nav>
          {/* Hero Section */}
          <div className='container mx-auto my-10'>
            <div className='flex flex-col items-center md:items-start justify-center p-5 h-3/4'>
              <h1 className='text-3xl font-bold text-center text-white my-4'>
                Ant Man and the Wasp
              </h1>
              <p className='text-sm  md:w-2/5  text-white my-4'>
                2018 . 12+ . 1h 58m . Action . Adventure . Comedy . Sci-Fi
              </p>
              <h2 className='text-lg md:w-2/5 text-white my-4'>
                Ant-Man and the Wasp find themselves exploring the Quantum
                Realm, interacting with strange new creatures and embarking on
                an adventure that pushes them beyond the limits of what they
                thought was possible.
              </h2>
              <div className='flex '>
                <button
                  type='button'
                  className='text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none '
                >
                  Watch Trailer
                </button>
                <button
                  type='button'
                  className='inline-flex text-white hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-white dark:hover:text-white dark:hover:bg-red-600 '
                >
                  <svg
                    fill='none'
                    stroke='currentColor'
                    stroke-width='1.5'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='w-5 h-5 mr-2 -ml-1'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                    ></path>
                  </svg>
                  Add Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <h1 className='text-2xl my-4 font-bold'>Just Released</h1>
        {/* <div className='flex flex-row space-x-4 my-2'> */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
    </div>
  );
}
