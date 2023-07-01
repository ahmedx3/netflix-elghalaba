'use client';

import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import MovieRow from '@/components/MovieRow';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../firebase';
import { doc, getDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';

export default function WatchList() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      getDoc(doc(collection(db, 'movies'), user.uid))
        .then((docSnap) => {
          if (docSnap.exists()) {
            setWatchlist(docSnap.data().watchlist);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [watchlist]);

  const handleNavigateToHome = () => {
    router.push('/');
  };

  const handleNavigateToBrowse = () => {
    router.push('/browse');
  };

  const handleSignout = () => {
    signOut(auth).then(() => {
      // redirect to home page
      router.push('/');
    });
  };

  return (
    <div>
      <div className='bg-[url(https://i.ibb.co/h9Z7TfK/FR-en-20230612-popsignuptwoweeks-perspective-alpha-website-large11.jpg)] w-full h-96 bg-no-repeat bg-cover'>
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
                class='text-white hover:text-black border border-white hover:bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-white dark:text-white dark:hover:text-black dark:hover:bg-white '
                onClick={handleNavigateToBrowse}
              >
                Home
              </button>
              <button
                type='button'
                onClick={handleSignout}
                className='text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none '
              >
                Log out
              </button>
            </div>
          </div>
        </nav>
        {/* Hero Section */}
        <div className='flex flex-col items-center justify-center p-5 h-3/4 '>
          <h1 className='text-5xl font-bold text-center text-white my-4 '>
            My watchlist
          </h1>
        </div>
      </div>
      <div className='container'>
        {/* if no movies show no movies in watchlist */}
        <MovieRow title='My WatchList' movies={watchlist}></MovieRow>
      </div>
    </div>
  );
}
