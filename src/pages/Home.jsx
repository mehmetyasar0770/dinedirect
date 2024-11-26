import { Link } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  return (
    <>
   
    <div className="text-center">
    <Header/>
      <h1 className="text-3xl font-bold mb-6">Hoş Geldiniz!</h1>
      <Link to = "/menu">
      <p className="text-blue-600 mb-4 ">
        Enfes lezzetler sadece birkaç tık uzağınızda. Menümüzü görmek için klikleyin!
      </p>
      <img
          src="https://static7.depositphotos.com/1035468/773/v/950/depositphotos_7734891-stock-illustration-cartoon-chef-cook.jpg"
          alt="Cartoon Chef"
          className="mx-auto w-64 h-auto cursor-pointer hover:scale-105 transition-transform"
        />
      </Link>
    </div>
    </>
  );
}

export default Home;
