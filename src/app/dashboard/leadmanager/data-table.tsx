"use client";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "./_components/Modal";

// Add this new type for available fields
const filterFields = [
  { value: "leadname", label: "Lead Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "country", label: "Country" },
  { value: "status", label: "Status" },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // State to manage selected filter field and filter value
  const [selectedField, setSelectedField] = React.useState<string>("email");
  const [filterValue, setFilterValue] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Update the filter based on selected field and value
  React.useEffect(() => {
    table.getColumn(selectedField)?.setFilterValue(filterValue);
  }, [selectedField, filterValue, table]);

  return (
    <div>
      <div className="flex justify-between items-center py-4 gap-4">
        {/* Dropdown for selecting the field */}
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="p-2 border rounded-md"
        >
          {filterFields.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>

        {/* Input for filtering the selected field */}
        <Input
          placeholder={`Filter by ${selectedField}...`}
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <Modal/>
      </div>

      {/* Fixed Table Layout */}
      <div className="rounded-md border bg-white overflow-x-auto">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: "150px" }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: "150px" }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
  );
}
