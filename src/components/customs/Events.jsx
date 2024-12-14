import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Pen } from "lucide-react";
import { ImBin } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPen } from "react-icons/fa";
import { useEventContext } from "@/context/EventContext";
import { useState } from "react";
import { useEffect } from "react";
import { useDateContext } from "@/context/DateContext";

// Utility function to apply a color based on event type
const getTypeColor = (type) => {
  // return "";
  switch (type) {
    case "work":
      return "bg-red-300";
    case "home":
      return "bg-green-300";
    case "personal":
      return "bg-blue-300";
    case "social":
      return "bg-yellow-300";
    default:
      return "";
  }
};

// Column configuration for the table
export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => {

  //     return <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   },
  //   cell: ({ row }) => {
  //     const { toggleEvent } = useEventContext();
  //     const toggleSelection = (value) => {
  //       row.toggleSelected(value);
  //       toggleEvent(row.original);
  //     };
  //     return (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => toggleSelection(value)}
  //         aria-label="Select row"
  //       />
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => (
      <div className="capitalize truncate max-w-36 lg:max-w-md">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize truncate max-w-36 lg:max-w-md">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          className="py-0 px-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Time
          <ArrowUpDown /> {/* Button to toggle sorting on start time */}
        </Button>
      );
    },
    cell: ({ row }) => {
      const startTime = row.getValue("startTime");
      return <div>{startTime}</div>;
    },
  },
  {
    accessorKey: "endTime",
    header: () => <div className="">End Time</div>,
    cell: ({ row }) => {
      const endTime = row.getValue("endTime");
      return <div>{endTime}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => {
      const { deleteEvent, updateEvent } = useEventContext();
      return (
        <div className="actions flex justify-start gap-5 items-center">
          <div
            className="hover:cursor-pointer"
            onClick={() => deleteEvent(row.original.id)} // Call deleteEvent with the row's id
          >
            <ImBin size={20} />
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => updateEvent(row.original.id)} // Call updateEvent with the row's id
          >
            <FaPen />
          </div>
        </div>
      );
    },
  },
];

export function Events() {
  // State hooks for sorting, filtering
  const [sorting, setSorting] = useState([{ id: "startTime", desc: false }]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const { events, updateEvent } = useEventContext();
  const { date } = useDateContext();
  const [todayEvents, setTodayEvents] = useState([]); // State to store filtered events for today

   // Effect to filter events based on the selected date
  useEffect(() => {
    if (events && date) {
      const temp = events.filter(
        (e) => e.fetchId === date.toLocaleDateString()  // Filter events by date
      );
      setTodayEvents(temp); // Update state with filtered events
    }
  }, [date, events]); // Re-run the effect when events or date change

   // React Table initialization with necessary options
  const table = useReactTable({
    data: todayEvents, // Use filtered events for today
    columns, // Use predefined columns
    onSortingChange: setSorting, // Update sorting state when sorting changes
    onColumnFiltersChange: setColumnFilters, // Update column filters state when filters change
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search Events..."
          value={table.getColumn("name")?.getFilterValue() ?? ""} // Use column filter for "name"
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value) // Set filter value when input changes
          }
          className="max-w-sm"
        />

        {/* Dropdown menu for column visibility toggle */}
        <DropdownMenu className="">
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide()) // Only show columns that can be hidden
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()} // Check visibility status of the column
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value) // Toggle visibility when checkbox state changes
                    }
                  >
                    {column.id} {/* Display column name */}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table display */}
      <div className={`rounded-md border`}>
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className=" text-left py-2 px-4 text-sm font-medium"
                    >
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
            {/* Render table rows */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"} // Highlight selected rows
                  className={`${getTypeColor(
                    row.original.type
                  )} hover:cursor-pointer`} // Apply color based on event type
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-left py-2 px-4 text-sm`}
                    >
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
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results. {/* Display message if no rows */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Row selection summary */}
      {/* Not needed now */}
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows?.length} of{" "}
          {table.getFilteredRowModel().rows?.length} row(s) selected.
        </div>
      </div> */}
    </div>
  );
}
