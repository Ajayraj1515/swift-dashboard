const Pagination = ({ currentPage, totalPages, pageSize, totalItems, onPageChange }) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 px-3 py-2 border-top">
      <div className="text-muted fw-semibold">
        {start} - {end} of {totalItems} items
      </div>
      <nav>
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link px-3 py-2"
              onClick={() => onPageChange(currentPage - 1)}
            >
              &lt;
            </button>
          </li>
          {pageNumbers.slice(currentPage - 1, currentPage + 1).map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link px-3 py-2"
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link px-3 py-2"
              onClick={() => onPageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
