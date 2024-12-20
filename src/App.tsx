/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useLoggedInState } from "./providers/LoggedInProvider";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import Salon from "./pages/Salon";
import Barbers from "./pages/Barbers";
import Barber from "./pages/Barber";
import Map from "./pages/Map";
import About from "./pages/About";
import NoNavbarLayout from "./pages/NoNavbarLayout";
import { useCategoriesSetState } from "./providers/CategoriesProvider";
import { useCheckLoggedIn } from "./hooks/auth";
import {
  useShowSplashScreenSetState,
  useShowSplashScreenState,
} from "./providers/ShowSplashScreen";
import { useGetCategories } from "./api/common/hooks";
import Loading from "./components/Loading";
import { useOpenToast } from "./hooks/popups";

function App() {
  const loggedIn = useLoggedInState();
  const { checkLoggedIn, loaded: checkLoggedInLoaded } = useCheckLoggedIn();
  const showSplashSceen = useShowSplashScreenState();
  const setShowSplashScreen = useShowSplashScreenSetState();

  const [appLoaded, setAppLoaded] = useState(false);

  const openToast = useOpenToast();

  const setCategories = useCategoriesSetState();
  const getCategories = useGetCategories();
  useEffect(() => {
    getCategories({
      setCategories,
      customFunction() {
        setAppLoaded(true);
        checkLoggedIn();
      },
      onError(error) {
        openToast(error.message);
      },
    });
  }, []);

  useEffect(
    () => setShowSplashScreen(!appLoaded || !checkLoggedInLoaded),
    [appLoaded, checkLoggedInLoaded]
  );

  function detectDeviceIsPhone(): boolean {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

  if (showSplashSceen) {
    return <SplashScreen />;
  } else {
    if (detectDeviceIsPhone()) {
      if (loggedIn) {
        return (
          <>
            <Loading />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="search" element={<Search />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/" element={<NoNavbarLayout />}>
                  <Route path="/map" element={<Map />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/salon">
                    <Route index path=":salon_slug" element={<Salon />} />
                    <Route path=":salon_slug/barbers" element={<Barbers />} />
                    <Route
                      path=":salon_slug/barbers/:barber_slug"
                      element={<Barber />}
                    />
                    <Route path="*" element={<NoPage />} />
                  </Route>
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
    } else {
      return (
        <div className="w-screen h-[100dvh] flex justify-center items-center px-[2rem]">
          <div className="flex flex-col items-center gap-[.5rem]">
            <div className="w-full flex flex-row-reverse justify-center items-center gap-[2rem]">
              <span
                dir="ltr"
                className="font-sans text-[3rem] text-primary font-bold"
              >
                .Best
              </span>
              <div className="w-[1.5px] rounded-full h-[4rem] bg-gray_001 dark:bg-gray_004 -mt-[.75rem]" />
              <span className="text-[3rem]">بهترین زیبایی ها</span>
            </div>
            <span className="text-[1.75rem] text-gray_001 text-center">
              برای استفاده از این اپلیکیشن می‌بایست تنها از تلفن همراه و یا تبلت
              خود استفاده کنید!
            </span>
          </div>
        </div>
      );
    }
  }
}

export default App;
