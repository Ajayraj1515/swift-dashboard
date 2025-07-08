import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then(users => {
      if (users && users.length > 0) {
        setUser(users[0]);
      }
    });
  }, []);

  if (!user) return <p>Loading profile...</p>;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="container mt-4">
      <button
        className="btn btn-light mb-3 text-black"
        onClick={() => navigate("/")}
      >
        ← Welocme, {user.name}
      </button>
      <h3 className="mb-4">Welcome to {firstName}</h3>

      <div className="card mb-4 shadow-sm p-3">
        <div className="d-flex align-items-center mb-3">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
            style={{ width: "50px", height: "50px", fontSize: "20px", fontWeight: "bold" }}
          >
            {user.name
              .split(" ")
              .map(part => part[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <h5 className="mb-0">{user.name}</h5>
            <small>{user.email}</small>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-2"><strong>User ID:</strong> {user.id}</div>
          <div className="col-md-6 mb-2"><strong>Username:</strong> {user.username}</div>
          <div className="col-md-6 mb-2"><strong>Phone:</strong> {user.phone}</div>
          <div className="col-md-6 mb-2"><strong>Website:</strong> {user.website}</div>
          <div className="col-md-6 mb-2"><strong>Company:</strong> {user.company?.name}</div>
          <div className="col-md-6 mb-2"><strong>Address:</strong> {user.address?.suite}, {user.address?.street}, {user.address?.city}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
