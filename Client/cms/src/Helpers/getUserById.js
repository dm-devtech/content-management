const getUserById = async (id) => {
  try {
    const newResponse = await fetch("/users/" + id);
    const user = await newResponse.json();
    return user === undefined || user.length === 0 ? 0 : user;
  } catch (err) {
    console.error(err.message);
  }
};

export default getUserById;
