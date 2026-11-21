import { NextRequest, NextResponse } from "next/server";
import { archiveCurrentUFCCard, handleError, predictNextUFCCard } from "../../common/common";


export async function GET(request: NextRequest) {
    try {
        await archiveCurrentUFCCard();
        await predictNextUFCCard();
        return NextResponse.json({message: "Predictions prepared successfully"});
    } catch (error) {
        handleError(error);
        return NextResponse.json({error: "Error preparing predictions"}, {status: 400});
    }
}