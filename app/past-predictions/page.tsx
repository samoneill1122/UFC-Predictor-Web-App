'use cache'
import axios from 'axios'

// const PastPredictionsPage = async () => {
//     let predictions = [];
//     try {
//         const res = await axios.get("http://localhost:3000/api/past-predictions");
//         predictions = res.data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.log(error.status)
//             console.error(error.response?.data.detail);
//         } else {
//             console.error(error);
//         }
//     }
//   return (
    
//   )
// }

// export default PastPredictionsPage

import { columns, PastPrediction } from "./columns"
import { DataTable } from "./data-table"

// async function getData(): Promise<PastPrediction[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

async function getData(): Promise<PastPrediction[]> {
    let predictions = [];
    try {
        const res = await axios.get("http://localhost:3000/api/past-predictions");
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