import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
//import Accounts from "../Util";
import Pagination from "../Pagination";
import searchObjectsByValue from "../Search";
import SearchRole from "../core/SearchRole";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setNotification } = useStateContext();

  const onPageClick = (link) => {
    getUsers(link.url);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const search = (data) => {
    return data.map((u) => (
      <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.phone}</td>
        <td>{(u.account_type)}</td>
        <td>{u.created_at}</td>
        <td>
          <Link className="btn-edit" to={"/auth/users/" + u.id}>
            Edit
          </Link>
          &nbsp;
          <button onClick={(ev) => onDelete(u)} className="btn-delete">
            Delete
          </button>
        </td>
      </tr>
    ))
  }

  const onDelete = (u) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    //removing the deleted user from the list
    axiosClient
      .delete(`/auth/users/${u.id}`)
      .then(() => {
        setNotification("User was successfully deleted");
        getUsers();
      });
  };

  const getUsers = (url) => {
    url = url || "/auth/users";
    setLoading(true);
    axiosClient
      .get(url) 
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        //console.log(data.data)
        SearchRole(data.data)
        //console.log(SearchRole(data.data));
        
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    const input = e.target.value.toString().toLowerCase();
    setSearchQuery(input);
    setSearchedUsers(searchObjectsByValue(users, input));
    // console.log(input)
    // console.log(users)

  };
  

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 className="font-bold text-3xl">Users</h2>
        <Link to="/auth/users/new" className="btn-add">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-3 py-2 mt-4 mb-2 w-full"
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Account Type</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">
                  loading...
                </td>
              </tr>
            </tbody>
          )}

          {!loading && (
            <tbody>
              {searchQuery.length == 0 ? search(users) : search(searchedUsers)}
            </tbody>
          )}
        </table>
      </div>
      <Pagination meta={meta} onPageClick={onPageClick} />
    </div>
  );
}