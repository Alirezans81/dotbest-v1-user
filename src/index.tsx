import ReactDOM from "react-dom/client";
import "./index.css";
import "react-dropdown/style.css";
import App from "./App";
import { LoggedInProvider } from "./providers/LoggedInProvider";
import { ModalProvider } from "./providers/ModalProvider";
import { CategoriesProvider } from "./providers/CategoriesProvider";
import { ToastProvider } from "./providers/ToastProvider";
import { UserProvider } from "./providers/UserProvider";
import { ShowSplashScreenProvider } from "./providers/ShowSplashScreen";
import { LoadingProvider } from "./providers/LoadingProvider";
import { GalleryViewProvider } from "./providers/GalleryViewData";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ShowSplashScreenProvider>
    <LoggedInProvider>
      <LoadingProvider>
        <ModalProvider>
          <GalleryViewProvider>
            <ToastProvider>
              <UserProvider>
                <CategoriesProvider>
                  <App />
                </CategoriesProvider>
              </UserProvider>
            </ToastProvider>
          </GalleryViewProvider>
        </ModalProvider>
      </LoadingProvider>
    </LoggedInProvider>
  </ShowSplashScreenProvider>
);
