import MovieCard from './MovieCard';

function MovieRow({ title, movies }) {
  return (
    <>
      <h1 className='text-2xl my-4 font-bold'>{title}</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default MovieRow;
