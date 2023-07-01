import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebase';
import { useEffect, useState } from 'react';
import { db } from '../app/firebase';
import axios from 'axios';

import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  collection,
} from 'firebase/firestore';

function MovieCard({ movie }) {
  const [user, loading, error] = useAuthState(auth);
  const [watchlist, setWatchlist] = useState([]);
  const [saved, setSaved] = useState(false);
  const [posterTrailer, setPosterTrailer] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };

  // Save or remove movie from watchlist
  const saveOrRemoveFromWatchlist = async () => {
    if (saved) {
      // Remove from watchlist
      const watchlistRef = doc(db, 'movies', user.uid);
      await updateDoc(watchlistRef, {
        watchlist: arrayRemove(movie),
      });
      setSaved(false);
    } else {
      // Add to watchlist
      const watchlistRef = doc(db, 'movies', user.uid);
      await updateDoc(watchlistRef, {
        watchlist: arrayUnion(movie),
      });
      setSaved(true);
    }
  };

  // See whether movie is in watchlist
  useEffect(() => {
    if (user) {
      getDoc(doc(collection(db, 'movies'), user.uid))
        .then((docSnap) => {
          if (docSnap.exists()) {
            setWatchlist(docSnap.data().watchlist);
            // Check if movie is in watchlist
            if (watchlist.some((item) => item.id === movie.id)) {
              setSaved(true);
            } else {
              setSaved(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
  }, [watchlist]);

  return (
    <>
      <div className='flex-none relative  snap-center snap-always w-[220px]'>
        <img
          onClick={() => {
            window.open(
              `https://www.youtube.com/watch?v=${posterTrailer}`,
              '_blank'
            );
          }}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className='rounded-lg opacity-80 object-cover hover:cursor-pointer'
        />
        <h3 className='absolute top-5 right-5'>
          {saved ? (
            <svg
              fill='white'
              stroke='currentColor'
              stroke-width='2.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-5 h-5 mr-2 -ml-1 hover:cursor-pointer'
              onClick={saveOrRemoveFromWatchlist}
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
              ></path>
            </svg>
          ) : (
            <svg
              fill='none'
              stroke='currentColor'
              stroke-width='2.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-5 h-5 mr-2 -ml-1 hover:cursor-pointer'
              onClick={saveOrRemoveFromWatchlist}
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
              ></path>
            </svg>
          )}
        </h3>
        <h3 className='absolute top-5 left-5'>
          <div className='flex items-center '>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-yellow-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Rating star</title>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <p class='ml-2 text-sm font-bold text-gray-900 dark:text-white'>
              {((movie.vote_average * 5) / 10).toFixed(2)}
            </p>
          </div>
        </h3>
      </div>
    </>
  );
}

export default MovieCard;
