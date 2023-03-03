import React, { useState, useEffect } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { useNavigate } from "react-router-dom";
import { view } from "@forge/bridge";
import { getJournals } from "../components/persistence/utils/StorageUtils";

const CustomDynamicTable = ({ journals }) => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState(1);

  // const [projectKey, setProjectKey] = useState(null);

  //     view.getContext().then((data) => {
  //       const { key } = data.extension.project;
  //       setProjectKey(key);
  //     });

  //     const journals =  getJournals(projectKey)

  (journals);

  const columns = journals?.length > 0 ? Object.keys(journals[0]) : [];
  const rows = journals?.map((item, index) => ({
    key: `row-${index}`,
    cells: columns?.map((column) => ({
      key: column,
      content: item[column],
      style: {padding: "10px",backgroundColor: currentItem === index ? "#E6EFFC" : "white" }
    })),
    onClick: () => navigate(`/project/${item.id}`),
    onMouseOver: () => {("Mouse over");setCurrentItem(index)} ,  
    style: { cursor: "pointer"}
  }));
  let rowsWithHighlightedRow = [...rows];
  rowsWithHighlightedRow[currentItem].isHighlighted = true;
  return (
    <>
      {journals.length > 0 && (
        <DynamicTable
          columns={columns?.map((column) => ({
            key: column,
            content: column,
            isSortable: true,
            shouldTruncate: true,
          }))}
          rows={rowsWithHighlightedRow}
          isFixedSize
          rowsPerPage={9}
          defaultPage={1}
          defaultSortKey={columns[0]}
          defaultSortOrder="asc"
        />
      )}
    </>
  );
};

export default CustomDynamicTable;
