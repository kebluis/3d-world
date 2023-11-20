import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <NavLink
        to="/"
        className="w-10 h-10 rounded-full bg-white items-center justify-center flex font-bold shadow-lg"
      >
        <p className="absolute p-4">KL</p>
      </NavLink>
    </header>
  );
};

export default Navbar;
