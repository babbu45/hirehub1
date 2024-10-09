import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <nav className="py-4 px-6 flex justify-between items-center w-full bg-white shadow-md">
      <Link to="/" className="link-logo">
        <img src="logo.png" className="h-20" alt="logo" />
      </Link>
      <Button className="button-outline">LOGIN</Button>
    </nav>
  );
};

export default Header;
