import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getNextUFCEvent } from "../common/common";


export async function GET(request: NextRequest) {
    const nextUFCEvent = await getNextUFCEvent();
    return NextResponse.json(nextUFCEvent.title);
}