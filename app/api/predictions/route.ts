import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEvent, handleError } from "../common/common";

export async function GET(request: NextRequest) {
    try {
        const predictions = await prisma.prediction.findMany({
            where: {eventCompleted: false}
        });
        return NextResponse.json({details: predictions});
    } catch (error) {
        handleError(error);
        return NextResponse.json({error: "Error getting current predictions"}, {status: 400});
    }
}