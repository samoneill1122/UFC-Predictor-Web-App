import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEvent, handleError } from "../common/common";


export async function GET(request: NextRequest) {
    try {
        const nextUFCEvent = await getNextUFCEvent();
        return NextResponse.json(nextUFCEvent.title);
    } catch (error) {
        handleError(error);
        return NextResponse.json({error: "Error getting next card"}, {status: 400});
    }
}