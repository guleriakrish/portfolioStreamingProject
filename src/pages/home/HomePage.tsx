// import { useNavigate } from "react-router";
import Header from "../../components/Header/Header";
import FilmGrid from "../../components/FilmGrid/FilmGrid";

function HomePage() {
  // const navigate = useNavigate();
    

  return (

    <div>
      <title>Old Indian Cinema</title>
      <Header/>
      <FilmGrid/>
      {/* <button
        onClick={() => {
          navigate("/testing");
        }}
      >
        Testing
      </button> */}
    </div>
  );
}

export default HomePage;
