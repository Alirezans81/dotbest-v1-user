/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import {
  useLoggedInSetState,
  useLoggedInState,
} from "./providers/LoggedInProvider";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Salon from "./pages/Salon";
import Barbers from "./pages/Barbers";
import Barber from "./pages/Barber";
import Map from "./pages/Map";
import About from "./pages/About";
import NoNavbarLayout from "./pages/NoNavbarLayout";
import { useCheckLoggedIn, useCheckTokenExpired } from "./hooks/auth";
import {
  useShowSplashScreenSetState,
  useShowSplashScreenState,
} from "./providers/ShowSplashScreen";
import Loading from "./components/Loading";
import GalleryView from "./components/GalleryView";
import Comments from "./pages/Comments";
import { TokenType, useTokenSetState } from "./providers/TokenProvider";
import { useGetUserData } from "./api/auth/hooks";
import { useGetCategories, useGetWallet } from "./api/common/hooks";
import Category from "./pages/Category";
import BarberCategory from "./pages/BarberCategory";
import Transaction from "./pages/Transaction";
import { useWalletSetState } from "./providers/WalletProvider";
import WalletPage from "./pages/Wallet";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const loggedIn = useLoggedInState();
  const setLoggedIn = useLoggedInSetState();
  const checkLoggedIn = useCheckLoggedIn();
  const checkTokenExpired = useCheckTokenExpired();
  const showSplashSceen = useShowSplashScreenState();
  const setShowSplashScreen = useShowSplashScreenSetState();
  const setToken = useTokenSetState();
  const setWallet = useWalletSetState();
  const pathname = window.location.pathname;

  const [appLoaded, setAppLoaded] = useState(false);

  const getUserData = useGetUserData();
  const getCategories = useGetCategories();
  const getWallet = useGetWallet();

  const initApp = (token: TokenType) => {
    getUserData({
      received_access_token: token.access,
      customFunction() {
        getCategories({
          received_access_token: token.access,
          customFunction() {
            setToken(token);
            setLoggedIn(true);

            getWallet({
              received_access_token: token.access,
              setWallet,
            });
          },
          onFinally() {
            setAppLoaded(true);
            setShowSplashScreen(false);
          },
        });
      },
      onError() {
        setAppLoaded(true);
        setShowSplashScreen(false);
      },
    });
  };
  useEffect(() => {
    const token = checkLoggedIn();
    if (token) {
      const tokenExpired = checkTokenExpired(token, (givenToken) =>
        initApp(givenToken)
      );
      if (!tokenExpired) initApp(token);
    } else {
      setAppLoaded(true);
      setShowSplashScreen(false);
    }
  }, []);

  useEffect(() => setShowSplashScreen(!appLoaded), [appLoaded]);

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

  if (detectDeviceIsPhone() || process.env.REACT_APP_MODE === "DEVELOPMENT") {
    if (showSplashSceen || loggedIn === null) {
      return <SplashScreen />;
    } else {
      if (loggedIn) {
        return (
          <>
            <GalleryView />
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
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/barber">
                    <Route path=":barber_slug" element={<Barber />} />
                    <Route
                      index
                      path=":barber_slug/comments"
                      element={<Comments />}
                    />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                  <Route path="/salon">
                    <Route index path=":salon_slug" element={<Salon />} />
                    <Route
                      index
                      path=":salon_slug/comments/"
                      element={<Comments />}
                    />
                    <Route path=":salon_slug/barbers" element={<Barbers />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                  <Route path="/category">
                    <Route path="*" element={<Category backlink="/" />} />
                  </Route>
                  <Route path="/barber-category">
                    <Route path="*" element={<BarberCategory backlink="/" />} />
                  </Route>
                </Route>
                <Route path="/transaction" element={<Transaction />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </>
        );
      } else {
        if (pathname === "/privacy-policy") {
          return (
            <div className="w-screen h-[100dvh]">
              <PrivacyPolicy />
            </div>
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
  } else {
    return (
      <div className="w-screen h-[100dvh] flex justify-center items-center px-[2rem]">
        <div className="flex flex-col items-center gap-[.5rem]">
          <div className="w-full flex flex-row-reverse justify-center items-center gap-[2rem]">
            <span
              dir="ltr"
              className="font-sans text-[3rem] text-primary font-bold"
            >
              .best
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

export default App;
