import "./Menu.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="item-con">
      <Link to="/" className="item">
        <HomeIcon />
        Home
      </Link>
      <Link to={"/"} className="item">
        <ExploreOutlinedIcon />
        Explore
      </Link>
      <Link to="/" className="item">
        <SubscriptionsOutlinedIcon />
        Subscription
      </Link>
      <hr />

      {!currentUser && (
        <>
          <div className="Login">
            Sign in to like Videos, comment and Subscribe.
            <Link to="/login">
              <div className="signin">
                <AccountCircleOutlinedIcon />
                Sign In
              </div>
            </Link>
          </div>
          <hr />
        </>
      )}

      <span className="title">Best of Video app</span>
      <div className="item">
        <LibraryMusicOutlinedIcon />
        Library
      </div>
      <div className="item">
        <HistoryOutlinedIcon />
        History
      </div>
      <div className="item">
        <SportsBasketballOutlinedIcon />
        Gaming
      </div>
      <div className="item">
        <MovieOutlinedIcon />
        Movie
      </div>
      <div className="item">
        <LiveTvOutlinedIcon />
        Live
      </div>
    </div>
  );
};

export default Menu;
