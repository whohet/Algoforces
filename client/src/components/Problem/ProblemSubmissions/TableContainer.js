import React from "react";
import { Table } from "react-bootstrap";
import { useTable, useSortBy, useFilters } from "react-table";

import "../Problem.css";

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // allColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {},
    },
    useFilters,
    useSortBy
  );

  const handleRowClick = () => {};

  return (
    <div className="table-and-filter-container">
      <Table bordered striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {/* Add a sort direction indicator */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleRowClick(row)}
                style={{ cursor: "pointer" }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableContainer;
