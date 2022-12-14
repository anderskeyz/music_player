import { loader } from "../assets";
const Loader = ({ title }) => (
  <div className=" flex flex-col justify-center items-center w-full">
    <img src={loader} alt=" loading" className=" w-32 h-32 object-contain " />
    <h1 className=" font-bold text-2xl text-white mt-2">
      {title || "loading"}
    </h1>
  </div>
);

export default Loader;
