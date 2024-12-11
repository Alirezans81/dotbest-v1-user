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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ShowSplashScreenProvider>
    <LoggedInProvider>
      <ModalProvider>
        <ToastProvider>
          <UserProvider>
            <CategoriesProvider>
              <App />
            </CategoriesProvider>
          </UserProvider>
        </ToastProvider>
      </ModalProvider>
    </LoggedInProvider>
  </ShowSplashScreenProvider>
);
