import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { useTable, useSortBy, useFilters } from "react-table";

import "./Problemset.css";

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["Tags"],
      },
    },
    useFilters,
    useSortBy
  );

  const filterableColumns = React.useMemo(() => {
    return allColumns.filter((column) => column.canFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const handleRowClick = (problem) => {
    history.push(`/problem/${problem.original.problemId}`);
  };

  return (
    <div className="table-and-filter-container">
      <div className="all-filters-container">
        {filterableColumns.map((column, index) => {
          const element_ids = {
            Tags: "filter-container-tags",
            Difficulty: "filter-container-difficulty",
            "Problem name": "filter-container-problem-name",
          };
          return (
            <div
              key={index}
              className="filter-container"
              id={element_ids[column.Header]}
            >
              {column.canFilter ? column.render("Filter") : null}
            </div>
          );
        })}
      </div>
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
