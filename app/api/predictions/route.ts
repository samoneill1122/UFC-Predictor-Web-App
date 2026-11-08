import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEventId } from "../common/common";

export async function GET(request: NextRequest) {
    let predictions: any = [];
    try {
        const nextUFCEventId = await getNextUFCEventId();
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