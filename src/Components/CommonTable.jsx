import { Button, Space, Table } from "antd"
import React from "react"
import "./CommonTable.scss"
import { Icon } from "@iconify/react"
import { useDispatch } from "react-redux"

const CommonTable = ({
  dataSource,
  columns,
  scrollHeight,
  rowSelection,
  onRowSelection,
  selectedRowKeys,
  nextPage,
  prevPage,
}) => {
  const dispatch = useDispatch()
  return (
    <>
      <Table
        dataSource={dataSource}
        tableLayout="auto"
        columns={columns}
        rowKey={(record) => record?.id}
        rowSelection={
          rowSelection && {
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: onRowSelection,
          }
        }
        scroll={{
          y: 532,
          x: 1000,
        }}
        footer={() => (
          <div className="table-footer">
            <Space>
              <Button size="small" onClick={() => dispatch(prevPage())}>
                <Icon icon="fluent:chevron-left-16-filled" />
              </Button>
              <Button size="small" onClick={() => dispatch(nextPage())}>
                <Icon icon="fluent:chevron-right-16-filled" />
              </Button>
            </Space>
          </div>
        )}
        pagination={false}
      />
    </>
  )
}

export default CommonTable
