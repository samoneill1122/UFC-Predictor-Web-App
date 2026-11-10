import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEvent } from "../common/common";

export async function GET(request: NextRequest) {
    let predictions: any = [];
    try {
        const nextUFCEvent = await getNextUFCEvent();
        const nextUFCEventId = nextUFCEvent.id;
        console.log(nextUFCEventId);
        predictions = await prisma.prediction.findMany({
            where: {eventId: nextUFCEventId}
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
    }
    return NextResponse.json(predictions);
}