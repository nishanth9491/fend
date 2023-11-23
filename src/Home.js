import React from "react";
import Navbar from "./components/Navbar/navbar";
import Today from "./components/Today/today";
import Implement from "./components/Calendar/implement";
import View from "./components/View/view";

const Home = () => {
  return (
    <div>
      <Navbar />

      <Today />
      <Implement />
      <View />
    </div>
  );
};

export default Home;
