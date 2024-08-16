import React, { useState } from 'react';
import HomeCarousal from '../../Components/Home Carousal/HomeCarousal';
import MenuExplore from '../../Components/Menu Explore/MenuExplore';
import Footer from '../../Components/Footer/Footer';
import AppDownload from '../../Components/App Download/AppDownload';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import Header from '../../Components/Navbar/Navbar';




const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <div>

      <Header></Header>
      <HomeCarousal></HomeCarousal>
      <MenuExplore category={category} setCategory={setCategory}></MenuExplore>
      <FoodDisplay category={category}></FoodDisplay>
      <AppDownload></AppDownload>
      <Footer></Footer>








    </div>
  );
};

export default Home;
