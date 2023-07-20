import React from "react";
import './App.css';
import Title from "./components/Title"
import SubmitForm from './components/SubmitForm';
import Favorites from "./components/Favorites";
import MainCard from "./components/MainCard";


const App = () => {
  const jsonLocalStorage = {
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/${responseJson.url}`;
  };

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCardSrc, setMainCardSrc] = React.useState('');
  const [favorites, setFavorite] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorites = favorites.includes(mainCardSrc);

  async function setInitialCat() {
    const newCat = await fetchCat('First Cat');
    setMainCardSrc(newCat);
  }

  // 내가 원하는 시점에만 함수를 호출하고 싶을 때 사용
  // [] << 컴포넌트가 나타날 때만 호출
  // [counter] << counter가 변경될 때 마다 호출
  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCardSrc(newCat);


    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter)
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCardSrc];
    setFavorite(nextFavorites);  // CAT1, CAT2, CAT3
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  function handleMouseOver() {

  }

  return (
    <div>
      <Title>{counter == null ? `` : counter + `번째 `}고양이</Title>
      <SubmitForm updateMainCat={updateMainCat} />
      <MainCard src={mainCardSrc}
        alt="고양이"
        width="400"
        alreadyFavorites={alreadyFavorites}
        onHeartClick={handleHeartClick}
        onMouseOver={handleMouseOver} />
      <Favorites favorites={favorites} />
    </div>
  )
};

export default App;
