const deleteUser = async (currentUser) => {
  try {
    await fetch("/users/" + currentUser, {
      method: "DELETE",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("deleted");
  } catch (err) {
    console.error(err.message);
  }
};

export default deleteUser;
