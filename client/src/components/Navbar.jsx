import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex fixed z-10 top-0 w-full bg-gray-700 px-5 py-3 justify-around items-center">
      <Link to='/' className="text-3xl">AIflix</Link>
      <Link to='/new'>
      <button >Create New Trailer</button>
      </Link>
    </div>
  );
}

export default Navbar;
