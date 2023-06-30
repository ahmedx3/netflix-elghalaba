import MovieCard from './MovieCard';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

function MovieRow({ title, movies }) {
  // Create slide left function
  const handleSlideLeft = () => {
    const slider = document.getElementById('slider' + title);
    slider.scrollLeft -= 200;
  };

  // Create slide right function
  const handleSlideRight = () => {
    const slider = document.getElementById('slider' + title);
    slider.scrollLeft += 200;
  };

  return (
    <>
      <h1 className='text-2xl my-4 font-bold'>{title}</h1>
      <div className='flex items-center'>
        <FaChevronCircleLeft
          className='opacity-70 absolute z-10 mx-2 hover:opacity-100 cursor-pointer'
          size={40}
          onClick={handleSlideLeft}
        />
        <FaChevronCircleRight
          className='opacity-70 absolute z-10 mx-2 right-4 md:right-20 hover:opacity-100 cursor-pointer'
          size={40}
          onClick={handleSlideRight}
        />
        <div
          id={'slider' + title}
          className='flex flex-nowrap snap-mandatory snap-x overflow-x-auto gap-4 no-scrollbar scroll-smooth'
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieRow;
