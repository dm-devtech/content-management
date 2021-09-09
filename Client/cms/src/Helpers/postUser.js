const postUser = async (email, password, role) => {
  try {
    const post = await fetch("/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
        date_created: "NOW()",
      }),
    });
  } catch (err) {
    console.error(err.message);
  }
};

export default postUser;
