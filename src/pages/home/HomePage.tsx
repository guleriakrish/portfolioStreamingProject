import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Here comes your money</h2>
      <button
        onClick={() => {
          navigate("/testing");
        }}
      >
        Testing
      </button>
    </>
  );
}

export default HomePage;
