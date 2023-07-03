import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./Styles/App.scss"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
  const publicRoutes = [
    {
      path : "/",
      element : <Login />
    },
    {
      path : "/register",
      element : <Register />
    },
    {
      path : "*",
      element : <Login />
    }
  ]

  const privateRoutes = [
    {
      path: "/homepage",
      element : <Homepage />
    },
    {
      path: "/message",
      element : <Chat />
    }
  ]
  return (
    <div className="App">
        <Routes>
          {/* <Route path="/homepage" element={} /> */}
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/message" element={} /> */}
          {/* <Route path="/message" element={<Register />} /> */}

          {
            publicRoutes.map((ele)=>{
              return <Route path={ele.path} element={ele.element} />
            })
          }
          {
           isLoggedIn && privateRoutes.map((ele)=>{
              return <Route path={ele.path} element={ele.element} />
            })
          }
        </Routes>
    </div>
  );
}

export default App;
