import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, data, activeSong, isPlaying }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    console.log(data);
  };
  return (
    <div className=" flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur rounded-lg animate-slideup cursor-pointer">
      <div className=" w-full h-56 relative group">
        <div
          className={` absolute inset-0 group-hover:flex justify-center items-center bg-black bg-opacity-50 ${
            activeSong?.title === song.title
              ? "bg-black bg-opacity-70"
              : "hidden"
          }  `}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img src={song.images?.coverart} alt="song-image" />
      </div>
      <div className=" mt-4 flex flex-col">
        <p className=" text-white text-lg  font-semibold truncate">
          <Link to={""}>{song.title}</Link>
        </p>
        <p className=" text-gray-300 truncate mt-1  text-sm">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
