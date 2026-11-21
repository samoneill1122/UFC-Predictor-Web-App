import { NextRequest, NextResponse } from "next/server";
import { archiveCurrentUFCCard, handleError } from "../common/common";


export async function PATCH(request: NextRequest) {
    try {
        await archiveCurrentUFCCard();
        return NextResponse.json({message: "Card archived successfully"});
    } catch (error) {
        handleError(error);
        return NextResponse.json({error: "Error archiving card"}, {status: 400});
    }
}