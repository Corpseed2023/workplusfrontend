import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Button } from "antd"
import React from "react"

const CommonDataTable = ({
  rows,
  columns,
  getRowId,
  checkbox,
}) => {
  return (
    <div style={{ height: "625px", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        checkboxSelection={checkbox}
      />
    </div>
  )
}

export default CommonDataTable
