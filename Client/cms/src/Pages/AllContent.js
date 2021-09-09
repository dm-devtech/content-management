import React, { useState, useEffect } from "react";
import Footer from "./Footer.js";
import getAllContent from "../Helpers/getAllContent";
import deleteContent from "../Helpers/deleteContent";

const AllContent = () => {
  const [list, setList] = useState("");

  useEffect(() => {
    async function setContentList() {
      const content = await getAllContent();
      setList(content);
    }

    setContentList();
  }, []);

  async function removeContent(id) {
    await deleteContent(id);
    const updatedContent = await getAllContent();
    console.log("delete content then updated content:", updatedContent);
    setList(updatedContent);
  }

  return (
    <div className="h1">
      Content View
      <br />
      <div className="lead" data-testid="content">
        {list === undefined || list.length === 0 || list === 0 ? (
          "No Content"
        ) : (
          <ul>
            {list.map((content) => (
              <li key={content.content_id}>
                Title: {content.title}
                <br />
                Content: {content.content}
                <br />
                Date Created: {content.date_created}
                <br />
                <button
                  className="btn btn-outline-dark"
                  data-testid="delete-button"
                  onClick={() => removeContent(content.content_id)}
                >
                  Delete Content{" "}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllContent;
