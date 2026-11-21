import { NextRequest, NextResponse } from "next/server";
import { handleError, predictNextUFCCard } from "../common/common";

export async function POST(request: NextRequest) {
    try {
        await predictNextUFCCard();
        return NextResponse.json({message: "Card predicted successfully"});
    } catch (error) {
        handleError(error);
        return NextResponse.json({error: "Error predicting card"}, {status: 400});
    }
}