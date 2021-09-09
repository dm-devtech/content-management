const getContentById = async (id) => {
  try {
    const newResponse = await fetch("/content/" + id);
    const content = await newResponse.json();
    return content === undefined || content.length === 0 ? 0 : content;
  } catch (err) {
    console.error(err.message);
  }
};

export default getContentById;
