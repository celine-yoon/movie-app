import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setDetail(json.data.movie);
      setLoading(false);
    };

    getMovies();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div>
          <h1>Detail</h1>
          <strong>Loading...</strong>
        </div>
      ) : (
        <div>
          <Link to="/">Back</Link>
          <h1>
            {detail.title} ({detail.language})
          </h1>
          <h3>Rating : {detail.rating}</h3>
          <img alt={detail.title} src={detail.large_cover_image} />
          <p>{detail.description_full}</p>
          <ul>
            {detail.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          {detail.torrents.map((torrent) => (
            <div key={torrent.quality}>
              <a href={torrent.url}>[{torrent.quality}] </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Detail;
