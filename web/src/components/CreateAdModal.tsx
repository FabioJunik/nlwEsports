import { Check, GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';


import { Input } from './Form/Input';
import { useEffect, useState } from 'react';

interface GameProps {
    id: string;
    title: string;
}

export function CreateAdModal() {

    const [games, setGames] = useState<GameProps[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/games")
            .then(response => response.json())
            .then(data => {
                setGames(data)
            })
    }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] text-white py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black '>Publique um anúncio</Dialog.Title>
                <form className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                        <select
                            name=""
                            id="game"
                            className='bg-zinc-900 py-3 px-4 text-sm rounded placeholder:text-zinc-500'
                        >
                            <option value="" selected disabled>Selecione o game que deseja jogar</option>
                            {games.map(({ id, title }) => (
                                <option value={id} key={id}>{title}</option>
                            ))}
                        </select>
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
                            <ToggleGroup.Root
                                type='multiple'
                                className='grid grid-cols-4 gap-2'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value='0'
                                    title='Domingo'
                                    className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >D</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='1'
                                    title='Segunda'
                                    className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >S</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='2'
                                    title='Terça'
                                    className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >T</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='3'
                                    title='Quarta'
                                    className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='4'
                                    title='Quinta'
                                    className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='5'
                                    title='Sexta'
                                    className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >S</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='6'
                                    title='Sabádo'
                                    className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >S</ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual o horário do dia ?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input id='hourStart' type="time" placeholder='De' />
                                <Input id='hourEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>
                    <label className='mt-2 flex gap-2 items-center text-sm'>
                        <Checkbox.Root className='w-6 h-6 p-1 bg-zinc-900 rounded'>
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar no chat de voz
                    </label>
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
    )
}