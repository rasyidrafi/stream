import SectionHeader from '../../components/organisms/DetailMovieContent/SectionHeader';
import SectionInfo from '../../components/organisms/DetailMovieContent/SectionInfo';
import SectionRecom from '../../components/organisms/DetailMovieContent/SectionRecom';
import VideoTrailer from '../../components/organisms/DetailMovieContent/VideoTrailer';
import Footer from '../../components/organisms/Footer';
import Navbar from '../../components/organisms/Navbar';
import {
  getCredits, getDetailMovie, getSimilarMovies, getVideoTrailer, getMoviesUrl
} from '../../services/data_api';
import { DetailMovieTypes } from '../../services/data_types';
import { NextSeo } from 'next-seo';

interface DetailMovieProps {
  movie: DetailMovieTypes;
  similarMovies: DetailMovieTypes[];
  direct: any;
  credits: any;
  trailer: {
    key: string;
  }
}

export default function DetailMovie(props: DetailMovieProps) {
  const {
    movie, similarMovies, trailer, credits, direct
  } = props;
  const rootImg = process.env.NEXT_PUBLIC_IMG;

  return (
    <>
      <NextSeo
        title={`${movie.title} (${movie.release_date.substring(0, 4)})` || "WhatMovie | Looking for information about your favorite movie"}
      />
      <div>
        <Navbar />
      </div>
      <div className="detail-movie mb-5">
        <div className="section-backdrop">
          <img src={`${rootImg}/w1280/${movie?.backdrop_path}`} alt={`backdrop ${movie?.title}`} />
        </div>
        <div className="section-content">
          <SectionHeader movie={movie} />
          <SectionInfo movie={movie} credits={credits} direct={direct} />
          <SectionRecom similarMovies={similarMovies} />
        </div>
        <div className="overlay">
          <VideoTrailer trailer={trailer} />
        </div>
      </div>
      <Footer />
    </>
  );
}

interface GetStaticProps {
    params: {
        id: number;
    }
}

export async function getServerSideProps({ params }: GetStaticProps) {
  const { id } = params;

  const direct = await getMoviesUrl(id)
  const movie = await getDetailMovie(id);
  const videosMovie:any = await getVideoTrailer(id);
  const trailer = videosMovie?.results?.filter((result: any) => result.type === 'Trailer')[0] || null;
  const similarMovies:any = await getSimilarMovies(id);
  const credits = await getCredits(id);

  return {
    props: {
      movie,
      trailer,
      credits,
      direct,
      similarMovies: similarMovies.results,
    },
  };
}
