import "./Navbar.scss";
import Logo from "../../assets/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav>
      <Link to={"/"}>
        <div className="logo">
          <img src={Logo} alt="LamaTube Logo" />
          video
        </div>
      </Link>
      <div className="searchbox">
        <input type="text" placeholder="Search" />
        <SearchOutlinedIcon />
      </div>
      {currentUser ? (
        <div className="user">
          <Link to={"/upload"}>

          <VideoCallOutlinedIcon />
          </Link>
          <img src={currentUser.img} alt="user profile pic" />
          <span>{currentUser.name}</span>
        </div>
      ) : (
        <Link to="/login" className="btn">
          <AccountCircleOutlinedIcon />
          Signin
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
