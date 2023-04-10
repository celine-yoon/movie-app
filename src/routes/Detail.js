import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

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
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <div>
            <img
              className={styles.movie__img}
              alt={detail.title}
              src={detail.large_cover_image}
            />
            <h3 className={styles.movie__info}>
              {`${detail.year} • Rating : ${detail.rating} • Popularity : ${detail.like_count}`}
            </h3>
            <ul className={styles.movie__genres}>
              {detail.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className={styles.movie__title}>{detail.title}</h1>
            <p>{detail.description_full}</p>
            <p>{`Language : ${detail.language}`}</p>
            <ul className={styles.movie__torrents}>
              {detail.torrents.map((torrent) => (
                <li key={torrent.quality}>
                  <a href={torrent.url}>{torrent.quality} </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
