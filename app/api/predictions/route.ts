import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEvent, handleError } from "../common/common";

export async function GET(request: NextRequest) {
    let predictions: any = [];
    try {
        const nextUFCEvent = await getNextUFCEvent();
        const nextUFCEventId = nextUFCEvent.id;
        predictions = await prisma.prediction.findMany({
            where: {eventId: nextUFCEventId}
        });
        return NextResponse.json({details: predictions});
    } catch (error) {
        handleError(error);
        return NextResponse.json({error: "Error getting current predictions"}, {status: 400});
    }
}