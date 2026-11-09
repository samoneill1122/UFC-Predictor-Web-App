import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEvent } from "../../common/common";


export async function POST(request: NextRequest) {
    const nextUFCEvent = await getNextUFCEvent();
    const nextUFCEventId = nextUFCEvent.id;
    const nextUFCEventTitle = nextUFCEvent.title;
    const card = await getNextUFCCard(nextUFCEventId);
    const fighters = card.filter((c: any) => c.status !== "cancelled").map((c: any) => ({fighter_b: c.fighter_a.name, fighter_r: c.fighter_b.name, card_section: c.card_section}));
    const cardPredictions = await getUFCCardPredictions(fighters)
    const mainPredictions = cardPredictions.main;
    const prelimsPredictions = cardPredictions.prelims;
    
    // persist predictions
    for (const prediction of mainPredictions) 
        persistPrediction(nextUFCEventId, nextUFCEventTitle, prediction, "main");
    for (const prediction of prelimsPredictions) 
        persistPrediction(nextUFCEventId, nextUFCEventTitle, prediction, "prelims");
    
    return NextResponse.json(cardPredictions);
}

async function persistPrediction(nextUFCEventId: number, nextUFCEventTitle: number, prediction: any, cardSection: "main" | "prelims") {
    const pred = await prisma.prediction.create({
        data: {
            eventId: nextUFCEventId,
            eventTitle: nextUFCEventTitle,
            fightTitle: prediction.fight_title,
            cardSection: cardSection,
            prediction: prediction.prediction,
        }
    });
    console.log("Created prediction: ", pred);
}

async function getUFCCardPredictions(fighters: []) {
    try {
        const res = await axios.post("http://localhost:8000/predict-card", {
            all_card_fight_details: fighters
        });
        return res.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
        return {};
    }
}

async function getNextUFCCard(nextUFCEventId: string) {
    try {
        const res = await axios.get("https://api.ufcalendar.com/v1/events/" + nextUFCEventId, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                Accept: 'application/json'
            }
        });
        return res.data.data.card;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
    }
}