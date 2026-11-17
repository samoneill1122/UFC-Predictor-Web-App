'use cache'
import axios from 'axios'

import { columns, PastPrediction } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<PastPrediction[]> {
    let predictions = [];
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/past-predictions`);
        predictions = res.data;
        console.log(predictions);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response?.data.detail);
        } else {
            console.error(error);
        }
    }
    return predictions;
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} groupBy='eventTitle' />
    </div>
  )
}