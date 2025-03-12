import OnClose from "../../img/OnClose";
import { Movie } from "../../types";
import styles from "./MovieTrailerModal.module.css";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

interface IMovieTrailerModal {
  movie: Movie;
  onClose: () => void;
}

const MovieTrailerModal = ({ movie, onClose }: IMovieTrailerModal) => {
  const [videoDimensions, setVideoDimensions] = useState(false);

  const updateVideoSize = () => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setVideoDimensions(false);
    } else if (window.matchMedia("(orientation: landscape)").matches) {
      setVideoDimensions(true);
    }
  };

  useEffect(() => {
    updateVideoSize();
    window.addEventListener("resize", updateVideoSize);
    return () => window.removeEventListener("resize", updateVideoSize);
  }, []);

  return (
    <Modal>
      <div className={styles.container}>
        <button
          onClick={onClose}
          className={`${styles.btnClose} ${
            videoDimensions ? styles.btnCloseLandscape : ""
          }`}
        >
          <OnClose />
        </button>
        <iframe
          className={`${styles.iframe} ${
            videoDimensions ? styles.iframeLandscape : ""
          }`}
          src={`https://www.youtube.com/embed/${movie.trailerYouTubeId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
          title={movie.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
};

export default MovieTrailerModal;
