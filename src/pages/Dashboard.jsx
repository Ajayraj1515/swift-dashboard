import { useEffect, useState } from "react";
import { getUsers, getComments } from "../services/api";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import TableHeader from "../components/TableHeader";
import { loadFromStorage, saveToStorage } from "../utils/localStorageUtils";

const Dashboard = () => {
  const [allComments, setAllComments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(loadFromStorage("search", ""));
  const [pageSize, setPageSize] = useState(loadFromStorage("pageSize", 10));
  const [currentPage, setCurrentPage] = useState(loadFromStorage("currentPage", 1));
  const [sort, setSort] = useState(loadFromStorage("sort", { key: "", order: "" }));
  const [user, setUser] = useState(null);

  useEffect(() => {
    getComments().then(data => setAllComments(data));
    getUsers().then(users => {
      if (users && users.length > 0) {
        setUser(users[0]);
      }
    });
  }, []);

  useEffect(() => {
    let filteredData = allComments.filter(comment =>
      comment.name.toLowerCase().includes(search.toLowerCase()) ||
      comment.email.toLowerCase().includes(search.toLowerCase())
    );

    if (sort.key && sort.order !== "") {
      filteredData.sort((a, b) => {
        const aVal = a[sort.key];
        const bVal = b[sort.key];

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sort.order === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          return sort.order === "asc" ? aVal - bVal : bVal - aVal;
        }
      });
    }

    setFiltered(filteredData);
    saveToStorage("search", search);
    saveToStorage("pageSize", pageSize);
    saveToStorage("currentPage", currentPage);
    saveToStorage("sort", sort);
  }, [allComments, search, pageSize, currentPage, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const currentData = filtered.slice(start, start + pageSize);

  const handleSort = (key) => {
    if (sort.key === key) {
      const newOrder = sort.order === "asc" ? "desc" : sort.order === "desc" ? "" : "asc";
      setSort({ key, order: newOrder });
    } else {
      setSort({ key, order: "asc" });
    }
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    const el = document.getElementById("comments-table");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="container-fluid mt-4 px-3 px-md-5">
      <div className="row g-3 align-items-center mb-4">
        <div className="col-12 col-md-8 d-flex flex-wrap gap-5">
          {[{ label: "Post ID", key: "postId" }, { label: "Name", key: "name" }, { label: "Email", key: "email" }].map(({ label, key }) => (
            <div
              key={key}
              className="border rounded bg-white d-flex align-items-center px-3 py-1 shadow-sm"
              style={{ Width: "100px", height: "45px", flex: "1 1 150px" }}
            >
              <span className="fw-semibold small me-2">Sort {label}</span>
              <div className="d-flex flex-column lh-1">
                <button
                  type="button"
                  className={`btn btn-sm p-0 border-0 ${sort.key === key && sort.order === "asc" ? "text-primary" : ""}`}
                  onClick={() => {
                    setSort({ key, order: "asc" });
                    setCurrentPage(1);
                  }}
                >
                  ▲
                </button>
                <button
                  type="button"
                  className={`btn btn-sm p-0 border-0 ${sort.key === key && sort.order === "desc" ? "text-primary" : ""}`}
                  onClick={() => {
                    setSort({ key, order: "desc" });
                    setCurrentPage(1);
                  }}
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-12 col-md-4 mt-4">
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setCurrentPage(1);
            }}
            inputClass="form-control form-control-sm w-100 border shadow-sm"
          />
        </div>
      </div>
      <div id="comments-table" className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <TableHeader title="Post ID" column="postId" sort={sort} onSort={handleSort} />
              <TableHeader title="Name" column="name" sort={sort} onSort={handleSort} />
              <TableHeader title="Email" column="email" sort={sort} onSort={handleSort} />
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(comment => (
              <tr key={comment.id}>
                <td>{comment.postId}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td>{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filtered.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
