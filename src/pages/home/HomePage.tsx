import { useNavigate } from "react-router";
import Header from "../../components/Header/Header";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <title>Old Indian Cinema</title>
      <Header/>
      <button
        onClick={() => {
          navigate("/testing");
        }}
      >
        Testing
      </button>
    </div>
  );
}

export default HomePage;
