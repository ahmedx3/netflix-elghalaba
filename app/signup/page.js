'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Redirect to browse page
        router.push('/browse');
        console.log(userCredential);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const router = useRouter();

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
        <div class='w-3/4 lg:w-1/4 p-4 justify-center  rounded-lg shadow sm:p-6 md:p-8 dark:bg-black bg-opacity-50 '>
          <form onSubmit={handleSignup} class='space-y-6'>
            <h5 class='text-2xl font-medium text-gray-900 dark:text-white'>
              Sign up
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button
              type='submit'
              class='w-full text-white bg-red-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 '
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
