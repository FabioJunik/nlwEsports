import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import logo from './assets/logo.svg';
import './styles/main.css';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';

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
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
          <Dialog.Content className='fixed bg-[#2A2634] text-white py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black '>Publique um anúncio</Dialog.Title>
            <form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <Input id='game' placeholder='Selecione o game que deseja jogar' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input
                  id='name'
                  type="text"
                  placeholder='Como te chamam dentro do game?'
                  className='bg-zinc-900 py-3 px-4 rounded'
                />
              </div>
              <div className='grid grid-cols-2  gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearPlaying">Jogas a quantos anos?</label>
                  <Input id='yearPlaying' type="number" placeholder='Pode ser ZERO' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual o seu discord ?</label>
                  <Input id='discord' type="text" placeholder='Usuario#0000' />
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando custumas jogar?</label>
                  <div className='grid grid-cols-4 gap-2'>
                    <button title='Domingo' className='w-8 h-8 rounded bg-zinc-900'>D</button>
                    <button title='Segunda' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                    <button title='Terça' className='w-8 h-8 rounded bg-zinc-900'>T</button>
                    <button title='Quarta' className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                    <button title='Quinta' className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                    <button title='Sexta' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                    <button title='Sabádo' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                  </div>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual o horário do dia ?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input id='hourStart' type="time" placeholder='De' />
                    <Input id='hourEnd' type="time" placeholder='Até' />
                  </div>
                </div>
              </div>
              <div className='mt-2 flex gap-2 text-sm'>
                <Input type="checkbox" />
                Costumo me conectar no chat de voz
              </div>
              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close
                  type='button'
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:zinc-600'
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type='submit'
                  className='flex items-center gap-4 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600'>
                  <GameController size={24} />
                  Encontrar
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
