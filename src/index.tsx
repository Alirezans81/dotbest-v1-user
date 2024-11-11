import ReactDOM from "react-dom/client";
import "./index.css";
import "react-dropdown/style.css";
import App from "./App";
import { LoggedInProvider } from "./providers/LoggedInProvider";
import { ModalProvider } from "./providers/ModalProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <LoggedInProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </LoggedInProvider>
);
