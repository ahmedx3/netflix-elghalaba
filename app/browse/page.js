'use client';

import { useRouter } from 'next/navigation';

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
                  class='text-white hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-white dark:hover:text-white dark:hover:bg-red-600 '
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
