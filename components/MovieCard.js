function movieCard({ movie }) {
  return (
    <div class='flex-none relative  snap-center snap-always w-[220px]'>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className='rounded-lg opacity-80 object-cover'
      />
      <h3 class='absolute top-5 right-5'>
        <svg
          fill='none'
          stroke='currentColor'
          stroke-width='2.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          className='w-5 h-5 mr-2 -ml-1 hover:cursor-pointer'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
          ></path>
        </svg>
      </h3>
      <h3 class='absolute top-5 left-5'>
        <div class='flex items-center '>
          <svg
            aria-hidden='true'
            class='w-5 h-5 text-yellow-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Rating star</title>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          <p class='ml-2 text-sm font-bold text-gray-900 dark:text-white'>
            {(movie.vote_average * 5) / 10}
          </p>
        </div>
      </h3>
    </div>
  );
}

export default movieCard;
