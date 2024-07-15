/* eslint-disable react/no-unescaped-entities */
import { Link  , useNavigate} from "react-router-dom";
import "../css/Home.css";
function Home() {
    const navigate = useNavigate();
  return (
    <>
      <div
        data-theme="forest"
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/01/11/21/27/desk-3076954_1280.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-100">
            <h1 className="mb-5 text-6xl font-bold font-body-Raleway">
              Hello there
            </h1>
            <p className="mb-5 text-4xl w-100">
              <p>Create and save your notes securely on the cloud.</p>
            </p>
            <button className="btn m-2 px-8" onClick={()=>{
                navigate("/signup")
            }}>Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
