import React, { useEffect } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, Login, Video } from "./Pages";
import { Navbar, Menu } from "./Components";
import './Styles/Global.scss';
import { useDispatch } from 'react-redux';
import { checkAccessTokenCookie } from "./Redux/userSlice";
import Upload from "./Pages/Upload/Upload";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(checkAccessTokenCookie());
  },[dispatch]);
  
  const Layout = () => {
    return (
      <div className="main">
        {/* dutmmy text */}
        <Navbar />
        <div className="container">
          <div className="menuContainer">

  
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
            {/* Subhan allah */}
          </div>
        </div>
      </div>
    );
  };


const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/video/:id",
        element: <Video />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:"/upload",
        element:<Upload/>
      }
    ],
  },
  
]);

return <RouterProvider router={router}/>
};
export default App;
