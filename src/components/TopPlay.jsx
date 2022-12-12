import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartsCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className=" w-full flex flex-row items-center mb-2 cursor-pointer py-2 p-4 rounded-lg hover:bg-[#4c426e]">
    <h3 className=" font-bold text-white mr-3 text-base">{i + 1}.</h3>
    <div className=" flex-1 justify-between items-center flex flex-row">
      <img
        src={song?.images?.coverart}
        alt="song title "
        className=" rounded-lg w-20 h-20"
      />
      <div className="flex flex-col mx-3 flex-1 justify-center  ">
        <Link to={`/songs/${song.key}`}>
          <p className=" text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className=" text-base mt-1 text-gray-300 ">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      song={song}
      handlePlay={handlePlayClick}
      handlePause={handlePauseClick}
      activeSong={activeSong}
    />
  </div>
);
const TopPlay = () => {
  const dispatch = useDispatch();
  const { data } = useGetTopChartsQuery();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  const topPlays = data?.slice(0, 5);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    console.log(data);
  };
  return (
    <div
      className=" xl:ml-6 ml-0 xl:mb-0 mb-6 xl:max-w-[500px] max-w-full flex-1 flex flex-col"
      ref={divRef}
    >
      <div className=" w-full flex flex-col">
        <div className=" flex flex-row justify-between items-center">
          <h2 className=" text-2xl font-bold text-white">Top charts</h2>
          <Link to={"/top-charts"}>
            <p className=" text-base text-gray-300 cursor-pointerss">
              see more
            </p>
          </Link>
        </div>
        <div className=" flex  mt-4 gap-1 flex-col">
          {topPlays?.map((song, i) => (
            <TopChartsCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              handlePauseClick={() => handlePauseClick(song, i)}
              handlePlayClick={() => handlePlayClick(song, i)}
              activeSong={activeSong}
            />
          ))}
        </div>
      </div>
      <div className=" flex flex-col w-full mt-8">
        <div className=" flex flex-row justify-between items-center">
          <h2 className=" text-2xl font-bold text-white">Top artists</h2>
          <Link to={"/top-artists"}>
            <p className=" text-base text-gray-300 cursor-pointerss">
              see more
            </p>
          </Link>
        </div>
        <Swiper
          freeMode
          slidesPerView={"auto"}
          centeredSlides
          spaceBetween={15}
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.key}
              style={{ width: "25%", height: "auto" }}
              className=" shadow-lg animate-slideright rounded-full"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="name"
                  className=" rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
