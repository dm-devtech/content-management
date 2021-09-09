const getUsers = async () => {
  try {
    const newResponse = await fetch("/users/");
    const users = await newResponse.json();
    return users === undefined || users.length === 0 ? 0 : users;
  } catch (err) {
    console.error(err.message);
  }
};

export default getUsers;
