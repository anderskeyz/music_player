import { Link } from "react-router-dom";

const DetailsHeader = ({ artistsId, songData, artistData }) => {
  const artist = artistData?.artists[artistsId].attributes;
  return (
    <div className=" w-full flex flex-col relative">
      <div className=" w-full bg-gradient-to-l from-transparent to-black h-28 sm:h-48" />
      <div className=" flex items-center absolute inset-0">
        <img
          src={
            artistsId
              ? artist?.artwork?.url.replace("{w}", "500").replace("{h}", "500")
              : songData?.images?.coverart
          }
          alt=""
          className=" sm:w-48 w-28 sm:h-48 h-28 rounded-full shadow-xl shadow-black object-cover border-2"
        />{" "}
        <div className=" ml-5">
          <p className=" font-bold sm:text-3xl text-xl text-white">
            {artistsId ? artist?.name : songData?.title}{" "}
          </p>
          {!artistsId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className=" font-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}{" "}
          <p className="font-bold sm:text-3xl text-xl text-white">    
            {artistsId ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className=" h-24 sm:h-44 w-full"></div>
    </div>
  );
};

export default DetailsHeader;
