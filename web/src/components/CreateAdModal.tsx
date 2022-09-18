import { Check, GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';


import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface GameProps {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<GameProps[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    useEffect(() => {
        axios("http://localhost:5000/games")
            .then(response => {
                setGames(response.data)
            })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData)
        console.log(data);
        console.log(weekDays);
        console.log(useVoiceChannel);

        try {
            await axios.post(`http://localhost:5000/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert("Anúncio criado com sucesso !");
        } catch (error) {
            console.log(error)
            alert("Erro ao criar anúncio");
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] text-white py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black '>Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                        <select
                            name="game"
                            id="game"
                            className='bg-zinc-900 py-3 px-4 text-sm rounded placeholder:text-zinc-500'
                            defaultValue=''
                        >
                            <option value="" defaultValue="">Selecione o game que deseja jogar</option>
                            {games.map(({ id, title }) => (
                                <option value={id} key={id}>{title}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input
                            name='name' id='name'
                            type="text"
                            placeholder='Como te chamam dentro do game?'
                            className='bg-zinc-900 py-3 px-4 rounded'
                        />
                    </div>
                    <div className='grid grid-cols-2  gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Jogas a quantos anos?</label>
                            <Input
                                name='yearsPlaying'
                                id='yearsPlaying'
                                type="number"
                                placeholder='Pode ser ZERO'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual o seu discord ?</label>
                            <Input
                                name='discord'
                                id='discord'
                                type="text"
                                placeholder='Usuario#0000'
                            />
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
                                <Input name='hourStart' id='hourStart' type="time" placeholder='De' />
                                <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>
                    <label className='mt-2 flex gap-2 items-center text-sm'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => { setUseVoiceChannel(checked ? true : false) }}
                            className='w-6 h-6 p-1 bg-zinc-900 rounded'
                        >
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