import { Table,  } from '@tanstack/react-table'
import React from 'react'
import { Button } from '../ui/button'

function TableFooter({table}: {table:Table<any>}) {
  const totalRow = table.getRowCount()
  return (
    <div className="flex items-center justify-end space-x-2 py-4 ">
    <div className="flex-1 text-sm text-primary-gray/50">
      {table.getCenterRows().length} of{" "}
      {totalRow} {totalRow > 1 ? "row(s)" : "row"}
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
  )
}

export default TableFooter