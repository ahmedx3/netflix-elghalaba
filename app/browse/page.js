'use client';

import { useRouter } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import MovieRow from '@/components/MovieRow';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { addDoc, setDoc, doc, getDoc } from 'firebase/firestore';

export default function Browse() {
  const router = useRouter();
  const [posterMovie, setPosterMovie] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=7213bf667d599cb17f7418bb9b096b33'
      )
      .then((response) => {
        const movie =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ];
        setPosterMovie(movie);
      });

    axios
      .get(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28,12',
        config
      )
      .then((response) => {
        setActionMovies(response.data.results);
      });

    axios
      .get(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35',
        config
      )
      .then((response) => {
        setComedyMovies(response.data.results);
      });
  }, []);

  // Add movie to watchlist
  const handleAddToWatchlist = async (movie) => {
    await updateDoc(doc(db, 'movies', user.uid), {
      watchlist: arrayUnion(movie),
    }).then(() => {
      alert('Added to watchlist!');
    });
  };

  const handleNavigateToHome = () => {
    router.push('/');
  };

  const hnadleNavigateToWatchlist = () => {
    router.push('/watchlist');
  };

  // create signout function
  const handleSignout = () => {
    signOut(auth).then(() => {
      // redirect to home page
      router.push('/');
    });
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${posterMovie?.backdrop_path}')`,
        }}
        className='w-full h-screen bg-no-repeat bg-cover'
      >
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
                  class='text-white hover:text-black border border-white hover:bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-white dark:text-white dark:hover:text-black dark:hover:bg-white '
                  onClick={hnadleNavigateToWatchlist}
                >
                  My Account
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
          <div className='container mx-auto my-10'>
            <div className='flex flex-col items-center md:items-start justify-center p-5 h-3/4'>
              <h1 className='text-3xl font-bold text-center text-white my-4'>
                {posterMovie.title}
              </h1>
              <p className='text-sm  md:w-2/5  text-white my-4'>
                {posterMovie.release_date?.substring(0, 4)} . Action . Adventure
                . Comedy . Sci-Fi
              </p>
              <h2 className='text-lg md:w-2/5 text-white my-4'>
                {posterMovie.overview}
              </h2>
              <div className='flex '>
                <button
                  type='button'
                  className='text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none '
                >
                  Watch Trailer
                </button>
                <button
                  onClick={() => handleAddToWatchlist(posterMovie)}
                  type='button'
                  className='inline-flex text-white
                  hover:text-white border border-red-700 hover:bg-red-800
                  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5
                  text-center mr-2 mb-2 dark:border-red-500 dark:text-white
                  dark:hover:text-white dark:hover:bg-red-600 '
                >
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='w-5 h-5 mr-2 -ml-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
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
        <MovieRow title='Action' movies={actionMovies} />
        <MovieRow title='Comedy' movies={comedyMovies} />
      </div>
    </div>
  );
}
