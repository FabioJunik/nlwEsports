import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import logo from './assets/logo.svg';
import './styles/main.css';
import { useEffect, useState } from 'react';

interface GameProps {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/games")
      .then(response => response.json())
      .then(data => {
        setGames(data)
        console.log(data);
      })
  }, [])
  return (
    <div className='max-w-[1344px] max-auto flex flex-col items-center my-20'>
      <img src={logo} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> esta aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(({ id, bannerURL, title, _count }) => (
          <GameBanner
            key={id}
            bannerURL={bannerURL}
            title={title}
            adsCount={_count.ads}
          />
        ))}
      </div>
      <CreateAdBanner />
    </div>
  )
}

export default App
