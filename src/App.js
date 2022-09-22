import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { About } from "./components/About/About";

function App() {
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <About />
      {/* <Intro />
        <CryptoVideo />
        <IntroTWO />
        <EthosIMG />
        <ParticipateIMG />
        <IdeaIMG />
        <MountIMG />
        <KnowMore />
        <Interested />
        <Bucky /> */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
