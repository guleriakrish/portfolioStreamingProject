import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import WatchPage from "./pages/watch/WatchPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/watch/:slug" element={<WatchPage />} />
      </Routes>
    </>
  );
}

export default App;
