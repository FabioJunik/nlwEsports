import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import logo from './assets/logo.svg';
import './styles/main.css';

function App() {

  return (
    <div className='max-w-[1344px] max-auto flex flex-col items-center my-20'>
      <img src={logo} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> esta aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mt-16'>
        <GameBanner bannerURL="/image 1.png" title="League of legends" adsCount={3} />
        <GameBanner bannerURL="/image 1.png" title="League of legends" adsCount={3} />
        <GameBanner bannerURL="/image 1.png" title="League of legends" adsCount={3} />
        <GameBanner bannerURL="/image 1.png" title="League of legends" adsCount={3} />
      </div>
      <CreateAdBanner />
    </div>
  )
}

export default App
