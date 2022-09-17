import express from "express";
import { PrismaClient } from "@prisma/client"
import cors from 'cors';

import { convetHourStringToMinute } from "./utils/convetHourStringToMinute";
import { convertMinuteToHourString } from "./utils/convertMinuteToHourString";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return response.json(games)
})

app.post('/ads', (request, response) => {
    return response.status(201).json([]);
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            hourStart: true,
            hourEnd: true
        },
        where: { gameId },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinuteToHourString(ad.hourStart),
            hourEnd: convertMinuteToHourString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {

    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.json(ad)
})

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const {
        name,
        yearsPlaying,
        discord,
        weekDays,
        hourStart,
        hourEnd,
        useVoiceChannel,
    } = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name,
            yearsPlaying,
            discord,
            weekDays: weekDays.join(','),
            hourStart: convetHourStringToMinute(hourStart),
            hourEnd: convetHourStringToMinute(hourEnd),
            useVoiceChannel
        }
    })

    return response.status(201).json(ad);
})

app.listen(5000, () => console.log("Server is runnig in port 5000"));
