'use client';

import { useRouter } from 'next/navigation';

export default function login() {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push('/login');
  };

  const handleNavigateToHome = () => {
    router.push('/');
  };
  return (
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
        </div>
      </nav>
      {/* Form */}
      <div className='flex flex-col items-center justify-center h-3/4'>
        <div class='w-1/4 p-4 justify-center  rounded-lg shadow sm:p-6 md:p-8 dark:bg-black bg-opacity-50 '>
          <form class='space-y-6' action='#'>
            <h5 class='text-2xl font-medium text-gray-900 dark:text-white'>
              Sign in
            </h5>
            <div>
              <label
                for='email'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                class='bg-gray-50   text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:text-white'
                placeholder='name@example.com'
                required
              ></input>
            </div>
            <div>
              <label
                for='password'
                class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                class='bg-gray-50   text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:text-white'
                required
              ></input>
            </div>
            <button
              type='submit'
              class='w-full text-white bg-red-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 '
            >
              Sign In
            </button>
            <div class='text-sm font-medium text-gray-500 dark:text-gray-300'>
              Not registered?{' '}
              <a
                href='#'
                class='text-red-700 hover:underline dark:text-red-500'
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
