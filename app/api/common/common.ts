import { prisma } from "@/lib/prisma";
import axios from "axios";

export async function getNextUFCEvent() {
    const res = await axios.get("https://api.ufcalendar.com/v1/events?org=ufc", {
        headers: {
            Authorization: `Bearer ${process.env.UFC_CALENDAR_API_KEY}`,
            Accept: 'application/json'
        }
    });
    return res.data.data[0];
}

export async function getUFCCardDetails(nextUFCEventId: string) {
    const res = await axios.get("https://api.ufcalendar.com/v1/events/" + nextUFCEventId, {
        headers: {
            Authorization: `Bearer ${process.env.UFC_CALENDAR_API_KEY}`,
            Accept: 'application/json'
        }
    });
    return res.data.data.card;
}

export async function predictNextUFCCard() {
    const nextUFCEvent = await getNextUFCEvent();
    const nextUFCEventId = nextUFCEvent.id;
    const nextUFCEventTitle = nextUFCEvent.title;
    const card = await getUFCCardDetails(nextUFCEventId);
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
    console.log("CARD PREDS: ", cardPredictions);
    
    for (const prediction of cardPredictions.main)
        persistPrediction(nextUFCEventId, nextUFCEventTitle, prediction, "main");
    for (const prediction of cardPredictions.prelims)
        persistPrediction(nextUFCEventId, nextUFCEventTitle, prediction, "prelims");

    return cardPredictions;
}

export async function archiveCurrentUFCCard() {
    const currPrediction: any = await prisma.prediction.findFirst({
        where: {eventCompleted: false}
    });
    const res = await axios.get("https://api.ufcalendar.com/v1/events/" + currPrediction.eventId, {
        headers: {
            Authorization: `Bearer ${process.env.UFC_CALENDAR_API_KEY}`,
            Accept: 'application/json'
        }
    });
    const card = res.data.data.card.filter((c: any) => c.status !== "cancelled");
    for (const fight of card) {
        const fighter_a_id = fight.fighter_a.id;
        const fighter_b_id = fight.fighter_b.id;
        const winnerId = fight.result.winner_fighter_id;
        let winnerName = "No contest/Draw";
        if (winnerId === fighter_a_id)
            winnerName = fight.fighter_a.name
        else if (winnerId === fighter_b_id)
            winnerName = fight.fighter_b.name;

        console.log("Fight ID = ", fight.id);
        const updatedPred = await prisma.prediction.update({
            where: {fightId: fight.id},
            data: {
                eventCompleted: true,
                winner: winnerName
            }
        });
        console.log("Updated prediction: ", updatedPred)
    }
}

export function handleError(error: any) {
    if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response?.data.detail);
    } else {
        console.error(error);
    }
}

async function getUFCCardPredictions(fighters: []) {
    const data = { all_card_fight_details: fighters };
    const headers = { 'x-api-key': process.env.UFC_PREDICTOR_API_KEY };
    const res = await axios.post(`${process.env.UFC_PREDICTOR_API_BASE_URL}/predict-card`, data, {
        headers: headers
    });
    return res.data;
}

async function persistPrediction(nextUFCEventId: number, nextUFCEventTitle: string, prediction: any, cardSection: "main" | "prelims") {
    console.log("PREDICTION:, " + prediction);
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
}

function removeAccents(s: string) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}