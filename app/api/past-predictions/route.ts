import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const completedPredictions = await prisma.prediction.findMany({
            where: { eventCompleted: true }
        });
        return NextResponse.json(completedPredictions);
    } catch (error) {
        return NextResponse.json({error: "Error getting past predictions"}, {status: 400});
    }
}