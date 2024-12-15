import React from 'react'
import { Input } from '../ui/input'
import { Table } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

type DataTableHeaderType = {
    table: Table<any>,
    setFilterQuery: React.Dispatch<React.SetStateAction<string>>,
    filterQuery: string
}

function DataTableHeader({ table, setFilterQuery, filterQuery }: DataTableHeaderType) {
    return (
        <div className="flex items-center py-4 md:px-4 px-2 flex-col md:flex-row *:w-full md:*:w-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder={`Search here...`}
                    value={filterQuery}
                    onChange={(event) => setFilterQuery(event.target.value)}
                    // table.getColumn(filterBy)?.setFilterValue(event.target.value)
                    // table.getAllColumns().map(each => each?.setFilterValue(event.target.value))

                    className="max-w-2xl py-2 pl-10 pr-4"
                />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto hidden md:block">
                        Columns
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default DataTableHeader