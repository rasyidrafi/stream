import CurrencyFormat from 'react-currency-format';
import { CreditsTypes, CrewCastTypes, DetailMovieTypes } from '../../../services/data_types';

interface SectionInfoProps {
    movie: DetailMovieTypes;
    credits: CreditsTypes;
    direct: any;
}

export default function SectionInfo(props: SectionInfoProps) {
  const { movie, credits, direct } = props;
  const year = new Date(movie.release_date);
  const rootImg = process.env.NEXT_PUBLIC_IMG;

  const crew = credits.crew.filter((person: CrewCastTypes) => person.job === 'Director' || person.job === 'Story' || person.job === 'Creator' || person.job === 'Writer');
  const cast = credits.cast.sort();

  return (
    <>
    { direct.status ? <div className="px-4 px-sm-5 mb-4">
      <div className="fluidMedia w-100">
        <iframe
            src={`https://watchsb.com/e/${direct.data.file_code}.html`}
            title={movie.title}
            className="sixteenByNineFrame"
            height="650"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          />
      </div>
    </div> : null }
    <div className="section-info px-4 px-sm-5">
      <div className="mt-4 mb-4 mb-lg-0 info-crew">
        {crew.map((person) => (
          <div key={person.credit_id} className="crew">
            <h5>{person.name}</h5>
            <p>{person.job}</p>
          </div>
        ))}
      </div>
      <div className="info-movie mb-4">
        <div>
          <h5 className="fw-bold">Status</h5>
          <p>{movie.status}</p>
        </div>
        <div>
          <h5 className="fw-bold">Release date</h5>
          <p>{year.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div>
          <h5 className="fw-bold">Duration</h5>
          <p>{`${movie.runtime} Min`}</p>
        </div>
        <div>
          <h5 className="fw-bold">Language</h5>
          <p>{movie.original_language}</p>
        </div>
        <div>
          <h5 className="fw-bold">Popularity</h5>
          <p>{movie.popularity}</p>
        </div>
        <div>
          <h5 className="fw-bold">Budget</h5>
          <p><CurrencyFormat value={movie.budget} displayType="text" prefix="$" thousandSeparator /></p>
        </div>
        <div>
          <h5 className="fw-bold">Revenue</h5>
          <p><CurrencyFormat value={movie.revenue} displayType="text" prefix="$" thousandSeparator /></p>
        </div>
      </div>
      <div className="info-overview">
        <div className="mb-4">
          <h5 className="fw-bold overview">Overview</h5>
          <p>{movie.overview}</p>
        </div>
        <div>
          <h5 className="fw-bold mb-3">Cast</h5>
          <div className="cast-wrapper">
            {cast.map((person) => {
              if (person.profile_path !== null) {
                return (
                  <div key={person.credit_id} className="cast-box">
                    <img src={`${rootImg}/w92${person.profile_path}`} alt={person.name} className="img-cast" />
                    <p>{person.original_name}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
