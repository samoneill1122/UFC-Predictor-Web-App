import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    const completedPredictions = await prisma.prediction.findMany({
        where: { eventCompleted: true }
    });

    return NextResponse.json(completedPredictions);
    
    // const cmpPredGrouped = completedPredictions.reduce((groups, row) => {
    //     const key = row.eventId;
    //     if (!groups[key]) 
    //         groups[key] = [];
        
    //     groups[key].push(row);
    //     return groups;
    // }, {} as Record<string, typeof completedPredictions>);

    // return NextResponse.json(cmpPredGrouped);
}