const TableHeader = ({ title, column, sort, onSort }) => {
  let icon = "";
  if (sort.key === column) {
    icon = sort.order === "asc" ? "▲" : sort.order === "desc" ? "▼" : "";
  }

  return (
    <th onClick={() => onSort(column)} style={{ userSelect: "none" }}>
      {title} {icon}
    </th>
  );
};

export default TableHeader;
