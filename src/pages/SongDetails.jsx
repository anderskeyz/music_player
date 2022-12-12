import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, RelatedSongs } from "../components";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const songId = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songId);
  console.log(songData);
  return (
    <div className=" flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className=" mb-10">
        <h2 className=" font-bold text-3xl text-white">Lyrics</h2>
        <div className=" mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p className=" text-base text-gray-400 my-1">{line}</p>
            ))
          ) : (
            <p className=" text-base text-gray-400 my-1">No Lyrics found</p>
          )}
        </div>
      </div>
      <RelatedSongs />
    </div>
  );
};

export default SongDetails;
