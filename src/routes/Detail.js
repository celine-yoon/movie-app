import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setDetail(json);
    };

    getMovies();
  }, [id]);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
export default Detail;
