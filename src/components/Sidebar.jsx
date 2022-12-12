import { useState } from "react";
import { logo } from "../assets";
import { links } from "../assets/constants";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const Sidebar = ({ handleClick }) => {
  const [monbileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <div className=" mt-10">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className="flex flex-row justify-start items-center text-gray-400  hover:text-cyan-400 my-8 font-medium text-sm"
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className=" h-6 w-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
  return (
    <>
      <div className=" md:flex flex-col hidden w-[240px] bg-[#191624] py-10 px-4">
        <img src={logo} alt="logo" className=" w-full h-14 object-contain" />
        <NavLinks />{" "}
      </div>
      <div className=" absolute right-3 md:hidden  top-6">
        {monbileMenuOpen ? (
          <RiCloseLine
            className=" h-6 w-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className=" h-6 w-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute  w-2/3 h-screen top-0 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          monbileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className=" w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />{" "}
      </div>
    </>
  );
};

export default Sidebar;
