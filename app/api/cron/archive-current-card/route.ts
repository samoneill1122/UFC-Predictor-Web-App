import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest) {
    const currPrediction: any = await prisma.prediction.findFirst({
        where: {eventCompleted: false}
    });

    try {
        const res = await axios.get("https://api.ufcalendar.com/v1/events/" + currPrediction[0].eventId, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                Accept: 'application/json'
            }
        });
        const card = res.data.card;
        for (const fight of card) {
            const fighter_a_id = fight.fighter_a.id;
            const fighter_b_id = fight.fighter_b.id;
            const winnerId = fight.result.winner_fighter_id;
            let winnerName = "No contest";
            if (winnerId === fighter_a_id)
                winnerName = fight.fighter_a.name
            else if (winnerId === fighter_b_id)
                winnerName = fight.fighter_b.name;
            prisma.prediction.update({
                where: {fightId: fight.id},
                data: {
                    eventCompleted: true,
                    winner: winnerName
                }
            });
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
        NextResponse.json({status: 400, message: "Error archiving card"});
    }

    return NextResponse.json({status: 200, message: "Card archived successfully"});
}