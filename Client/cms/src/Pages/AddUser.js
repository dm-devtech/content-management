import React, { useState, useEffect } from "react";
import Footer from "./Footer.js";
import getAllUsers from "../Helpers/getAllUsers";
import getUserById from "../Helpers/getUserById";
import deleteUser from "../Helpers/deleteUser";
import postUser from "../Helpers/postUser";

const AddUser = () => {
  const [list, setList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function setUserList() {
      const users =
        (await getAllUsers()) === undefined ? [] : await getAllUsers();
      const ids = await getUserIds();
      setList(users[0]);
      setCurrentUser(ids[0]);
    }

    setUserList();
  }, []);

  async function getUserIds() {
    const allUsers =
      (await getAllUsers()) === undefined ? [] : await getAllUsers();
    const sortedIds = allUsers
      .map((user) => user.user_id)
      .sort((a, b) => a - b);
    return sortedIds;
  }

  async function userCounter(direction) {
    const ids = await getUserIds();
    if (direction === "next" && counter <= ids.length - 2)
      await setCounter(counter + 1);
    if (direction === "previous" && counter > 0) await setCounter(counter - 1);
  }

  async function switchUser(direction) {
    const ids = await getUserIds();
    await userCounter(direction);
    const currentUserId = ids[counter];
    const updatedUser = await getUserById(currentUserId);
    setList(updatedUser);
  }

  async function removeUser() {
    const ids = await getUserIds();
    const currentUserId = ids[counter];
    await deleteUser(currentUserId);
    await updateUsers();
  }

  async function addNewUser() {
    await postUser(email, password, role);
    await updateUsers();
  }

  async function updateUsers() {
    const ids = await getUserIds();
    const currentUserId = ids[counter];
    const updatedUsers = await getUserById(currentUserId);
    await setList(updatedUsers);
  }

  const mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You have added new user:" + email);
    addNewUser();
  };

  const myChangeHandler = (event) => {
    let header = event.target.name;
    let value = event.target.value;
    if (header === "email") setEmail(value);
    if (header === "password") setPassword(value);
    if (header === "role") setRole(value);
  };

  return (
    <div className="h1" data-testid="header">
      {" "}
      Add User
      <div className="lead">
        <div className="lead" data-testid="user-email">
          User Email:{" "}
          {list === undefined || list.length === 0 ? "-" : list.email}
          <br />
          <div className="lead" data-testid="user-role">
            User Role:{" "}
            {list === undefined || list.length === 0 ? "-" : list.role}
            <br />
            <div className="lead" data-testid="user-date">
              Date Created:{" "}
              {list === undefined || list.length === 0
                ? "-"
                : list.date_created}
              <br />
              <button
                className="btn btn-outline-dark"
                data-testid="previous-user"
                onClick={() => switchUser("previous")}
              >
                Previous User{" "}
              </button>
              <button
                className="btn btn-outline-dark"
                data-testid="next-user"
                onClick={() => switchUser("next")}
              >
                Next User{" "}
              </button>
              <button
                className="btn btn-outline-dark"
                data-testid="delete-user"
                onClick={() => removeUser()}
              >
                Delete User{" "}
              </button>
              <div className="h1">
                Add User
                <form onSubmit={mySubmitHandler}>
                  <p className="lead">Enter User Email:</p>
                  <textarea
                    class="mb-0"
                    name="email"
                    onChange={myChangeHandler}
                    style={{ width: "220px", height: "35px" }}
                  />
                  <p className="lead">Enter User Password:</p>
                  <textarea
                    class="mb-0"
                    name="password"
                    type="password"
                    onChange={myChangeHandler}
                    style={{ width: "220px", height: "35px" }}
                  />
                  <p className="lead">Enter User Role:</p>
                  <textarea
                    class="mb-0"
                    name="role"
                    onChange={myChangeHandler}
                    style={{ width: "220px", height: "35px" }}
                  />
                  <br />
                  <input
                    type="submit"
                    data-testid="Submit"
                    className="btn btn-outline-dark"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddUser;
