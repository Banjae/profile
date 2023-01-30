import { Link, NavLink } from "react-router-dom";

// fontawsome 적용
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const active = { color: "#519D9E" };
  return (
    <header className={props.type}>
      <div className="inner">
        <h1>
          <Link to="/">Logo</Link>
        </h1>
        <ul id="gnb">
          <li>
            <NavLink activeStyle={active} to="/department">
              Department
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/community">
              Community
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/gallery">
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/youtube">
              Youtube
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/location">
              Location
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/join">
              Join
            </NavLink>
          </li>
        </ul>
        <FontAwesomeIcon icon={faBars} className="fa-bars" />
      </div>
    </header>
  );
};

export default Header;
