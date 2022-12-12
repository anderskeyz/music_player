import { Error, SongCard, Loader } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
const Discover = () => {
  const genreTitle = "pop";
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title=" Loading songs..." />;
  if (error) return <Error title="Error in  Loading songs..." />;

  return (
    <div className=" flex flex-col">
      <div className=" w-full flex justify-between items-center sm:flex-row mt-4 mb-10 flex-col">
        <h2 className=" text-3xl font-bold text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className=" mt-5 sm:mt-0  bg-black outline-none p-3 text-gray-300 rounded-lg"
        >
          {" "}
          {genres.map((gen) => (
            <option key={gen.value} value={gen.value}>
              {" "}
              {gen.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center sm:justify-start gap-8  flex-wrap">
        {data.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
