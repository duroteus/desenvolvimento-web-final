import { Outlet } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <div className="container" style={{ height: "40rem", margin: "2rem auto" }}>
      <Outlet />
    </div>
  );
};

export default App;
