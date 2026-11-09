"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { ChevronRight } from 'lucide-react'
import { type DataTableFeatures } from "./data-table-features"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PastPrediction = {
  id: number
  cardSection: "main" | "prelims"
  eventTitle: string
  fightTitle: string
  prediction: string
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, PastPrediction>()

export const columns = columnHelper.columns([
  columnHelper.accessor("cardSection", {
    header: "Card Section",
  }),
  columnHelper.accessor("eventTitle", {
    header: "Event",
    cell: ({ row, cell, getValue }) => {
      if (cell.getIsGrouped()) {
        return (
          <button
            type="button"
            onClick={row.getToggleExpandedHandler()}
            className="flex items-center gap-1.5 font-medium"
          >
            <ChevronRight
              className={`h-3.5 w-3.5 transition-transform ${
                row.getIsExpanded() ? 'rotate-90' : ''
              }`}
            />
            {getValue() as string}
            <span className="font-normal text-muted-foreground">
              ({row.subRows.length})
            </span>
          </button>
        )
      }
      if (cell.getIsPlaceholder()) return null
      return <span className="pl-5">{getValue() as string}</span>
    },
  }),
  columnHelper.accessor("fightTitle", {
    header: "Fight",
  }),
  columnHelper.accessor("prediction", {
    header: "Prediction",
  })
])