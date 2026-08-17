import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/testing" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export default App;
