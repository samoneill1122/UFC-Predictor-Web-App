import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEvent } from "../../common/common";

export async function POST(request: NextRequest) {
    const nextUFCEvent = await getNextUFCEvent();
    const nextUFCEventId = nextUFCEvent.id;
    const nextUFCEventTitle = nextUFCEvent.title;
    const card = await getNextUFCCard(nextUFCEventId);
    const fighters = card.filter((c: any) => c.status !== "cancelled")
        .map((c: any) => (
            {
                fight_id: c.id, 
                fighter_b: removeAccents(c.fighter_a.name), 
                fighter_r: removeAccents(c.fighter_b.name), 
                card_section: c.card_section, 
                ordering: c.ordering
            }));
    const cardPredictions = await getUFCCardPredictions(fighters)
    console.log(cardPredictions.main);
    console.log(cardPredictions.prelims);
    
    // persist predictions
    for (const prediction of cardPredictions.main) {
        console.log(prediction);
        persistPrediction(nextUFCEventId, nextUFCEventTitle, prediction, "main");
    }
    for (const prediction of cardPredictions.prelims) {
        console.log(prediction);
        persistPrediction(nextUFCEventId, nextUFCEventTitle, prediction, "prelims");
    }
    
    return NextResponse.json(cardPredictions);
}

function removeAccents(s: string) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function persistPrediction(nextUFCEventId: number, nextUFCEventTitle: string, prediction: any, cardSection: "main" | "prelims") {
    console.log("INSIDE PERSIST PREDICTION")
    try {
        const pred = await prisma.prediction.create({
            data: {
                fightId: prediction.fight_id,
                eventId: nextUFCEventId,
                eventTitle: nextUFCEventTitle,
                fightTitle: prediction.fight_title,
                cardSection: cardSection,
                prediction: prediction.prediction[0],
                confidence: prediction.prediction[1],
                ordering: prediction.ordering
            }
        });
        console.log("Created prediction: ", pred);
    } catch (error) {
        console.error(error);
    }
}

async function getUFCCardPredictions(fighters: []) {
    try {
        const data = { all_card_fight_details: fighters };
        // console.log("data: ", data);
        const headers = { 'x-api-key': process.env.UFC_PREDICTOR_API_KEY };
        const res = await axios.post(`${process.env.UFC_PREDICTOR_API_BASE_URL}/predict-card`, data, {
            headers: headers
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
                Authorization: `Bearer ${process.env.UFC_CALENDAR_API_KEY}`,
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