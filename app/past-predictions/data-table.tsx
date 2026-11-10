"use client"

import {
  flexRender,
  useTable,
} from '@tanstack/react-table'
import type {
  ColumnDef,
  ExpandedState,
  GroupingState, 
  ColumnFiltersState, RowData} from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { features, type DataTableFeatures } from "./data-table-features"
import { useState } from "react"
import { cn } from "cn"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  groupBy: string
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  groupBy,
}: DataTableProps<TData>) {
  const [grouping, setGrouping] = useState<GroupingState>([groupBy])
  const [expanded, setExpanded] = useState<ExpandedState>(true)

  const table = useTable({
    features,
    data,
    columns,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    globalFilterFn: "includesString",
    state: {
      grouping,
      expanded,
    },
    initialState: {
      sorting: [
        {
          id: 'cardSection',
          desc: false, // sort by name in descending order by default
        },
      ],
    },
  });

  return (
    <>
    <div className="flex flex-wrap gap-3 pb-3">
        <input
          value={String(table.state.globalFilter ?? "")}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder="Search predictions..."
          aria-label="Search predictions..."
          className="rounded-lg border px-3 py-1.5"
        />
      </div>
    <div className="overflow-hidden border bg-gray-200 rounded-sm p-2">
      <Table>
        <TableHeader className='border-b-2 border-b-black'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(row.getIsGrouped() && 'bg-muted-50 border-b-1 border-b-gray-500')}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell}/>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
    </>
  )
}