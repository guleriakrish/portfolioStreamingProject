import "./App.css";
import Testing from "./pages/Testing/Testing";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </>
  );
}

export default App;
