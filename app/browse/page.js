'use client';

import { useRouter } from 'next/navigation';
import MovieRow from '@/components/MovieRow';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { doc } from 'firebase/firestore';

export default function Browse() {
  const router = useRouter();
  const [posterMovie, setPosterMovie] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [posterTrailer, setPosterTrailer] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjEzYmY2NjdkNTk5Y2IxN2Y3NDE4YmI5YjA5NmIzMyIsInN1YiI6IjY0ODljOTczZTM3NWMwMDBjNTJhNGVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mN5kLAJZ2xPyFNlDpi-9rmt00eWZRxb7cb9ETJ16w9E`,
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
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
            config
          )
          .then((response) => {
            // loop through results and find key with value 'Trailer'
            const trailer = response.data.results.find(
              (item) => item.type === 'Trailer'
            );
            setPosterTrailer(trailer.key);
          });
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
                {posterMovie.release_date?.substring(0, 4)}
              </p>
              <h2 className='text-lg md:w-2/5 text-white my-4'>
                {posterMovie.overview}
              </h2>
              <div className='flex '>
                <button
                  type='button'
                  className='text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none '
                  onClick={() => {
                    window.open(
                      `https://www.youtube.com/watch?v=${posterTrailer}`,
                      '_blank'
                    );
                  }}
                >
                  Watch Trailer
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
