'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push('/login');
  };

  const handleNavigateToHome = () => {
    router.push('/');
  };

  return (
    <div>
      <div className='bg-[url(https://i.ibb.co/h9Z7TfK/FR-en-20230612-popsignuptwoweeks-perspective-alpha-website-large11.jpg)] w-full h-screen bg-no-repeat bg-cover'>
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
                onClick={handleNavigateToLogin}
                type='button'
                className='text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none '
              >
                Sign In
              </button>
            </div>
          </div>
        </nav>
        {/* Hero Section */}
        <div className='flex flex-col items-center justify-center p-5 h-3/4'>
          <h1 className='text-5xl font-bold text-center text-white my-4'>
            Unlimited movies, TV shows, and more.
          </h1>
          <h2 className='text-2xl text-center text-white my-4'>
            Watch anywhere. Cancel anytime.
          </h2>
        </div>
      </div>
    </div>
  );
}
