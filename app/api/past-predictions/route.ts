import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const completedPredictions = await prisma.prediction.findMany({
        where: { eventCompleted: true }
    });

    return NextResponse.json(completedPredictions);
}