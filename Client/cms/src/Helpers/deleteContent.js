const deleteContent = async (currentContent) => {
  try {
    await fetch("/content/" + currentContent, {
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

export default deleteContent;
