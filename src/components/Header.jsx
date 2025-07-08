import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsers().then(users => {
      if (users && users.length > 0) {
        setUser(users[0]);
      }
    });
  }, []);

  return (
    <nav
      className="navbar d-flex justify-content-between"
      style={{
        backgroundColor: "#003366",
        padding: "0.75rem 8.2rem"
      }}
    >
      <div>
        <img
          src="https://uploads-ssl.webflow.com/5fc61558289f574d2b695fe4/5fc7ad2ded1767b08813a7b5_logo.png"
          alt="Logo"
          style={{ height: "57px" }}
        />
      </div>

      <div>
        {user ? (
          <button
            className="btn btn-light d-flex align-items-center text-white px-3 py-2" style={{
        backgroundColor: "#003366"}}
            onClick={() => navigate("/profile")}
          >
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              {user.name
                .split(" ")
                .map(part => part[0])
                .join("")
                .toUpperCase()}
            </div>
            <span>{user.name}</span>
          </button>
        ) : (
          <span className="text-white">Loading...</span>
        )}
      </div>
    </nav>
  );
};

export default Header;
