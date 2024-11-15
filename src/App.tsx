import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useLoggedInState } from "./providers/LoggedInProvider";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import { useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import Salon from "./pages/Salon";
import Barbers from "./pages/Barbers";
import Barber from "./pages/Barber";
import Modal from "./components/Modal";
import Map from "./pages/Map";
import About from "./pages/About";

function App() {
  const loggedIn = useLoggedInState();
  const [showSplashSceen, setShowSplashSceen] = useState(false);

  if (showSplashSceen) {
    return <SplashScreen />;
  } else {
    if (loggedIn) {
      return (
        <>
          <Modal />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="reports" element={<Reports />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="/map" element={<Map />} />
              <Route path="/about" element={<About />} />
              <Route path="/salon">
                <Route index path=":salon_slug" element={<Salon />} />
                <Route path=":salon_slug/barbers" element={<Barbers />} />
                <Route
                  path=":salon_slug/barbers/:barber_slug"
                  element={<Barber />}
                />
                {/* <Route
                  path=":salon_slug/barbers/:barber_slug/reserve"
                  element={<Reserve />}
                /> */}
              </Route>
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    } else {
      return (
        <div className="w-screen h-[100dvh]">
          <Login />
        </div>
      );
    }
  }
}

export default App;
