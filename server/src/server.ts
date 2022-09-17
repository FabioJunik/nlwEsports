import express from "express";
import { PrismaClient } from "@prisma/client"

const app = express();
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
        }
    }))
})

app.get('/ads/:id/discover', (request, response) => {
    return response.json([])
})

app.listen(5000, () => console.log("Server is runnig in port 5000"));
