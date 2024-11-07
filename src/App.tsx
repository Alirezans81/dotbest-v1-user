import Login from "./pages/Login";
import { useLoggedInState } from "./providers/LoggedInProvider";

function App() {
  const loggedIn = useLoggedInState();

  if (loggedIn) {
    return <div className="w-screen h-[100dvh]"></div>;
  } else {
    return (
      <div className="w-screen h-[100dvh]">
        <Login />
      </div>
    );
  }
}

export default App;
