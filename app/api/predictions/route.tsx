import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const card = await getNextUFCCard(await getNextUFCEventId());
    const fighters = card.filter((c: any) => c.status !== "cancelled").map((c: any) => ({fighter_b: c.fighter_a.name, fighter_r: c.fighter_b.name, card_section: c.card_section}));
    const cardPredictions = getUFCCardPredictions(fighters)
    
    
    return NextResponse.json(cardPredictions);
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

async function getNextUFCEventId() {
    try {
        const res = await axios.get("https://api.ufcalendar.com/v1/events?org=ufc", {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                Accept: 'application/json'
            }
        });
        return res.data.data[0].id
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
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