import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">Logo</Link>
      </h1>
      <ul>
        <li>
          <Link to="/department">Department</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li>
          <Link to="/youtube">Youtube</Link>
        </li>
        <li>
          <Link to="/location">Location</Link>
        </li>
        <li>
          <Link to="/join">Join</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
