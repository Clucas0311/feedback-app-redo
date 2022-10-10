import { createContext, useState, useEffect } from "react";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await fetch(`/feedback?_sort="id&_order=desc`);
      const data = await response.json();
      setFeedback(data);
    };
    fetchFeedback();
  }, []);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  const deleteFeedbackItemHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}, {method: "DELETE"}`);
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addNewFeedbackHandler = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await response.json();

    setFeedback((prevFeedback) => {
      return [data, ...prevFeedback];
    });
  };

  const editFeedbackHandler = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  const updateFeedbackHandler = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback: feedback,
        feedbackEdit: feedbackEdit,
        onDeleteFeedback: deleteFeedbackItemHandler,
        onAddFeedback: addNewFeedbackHandler,
        onEditFeedback: editFeedbackHandler,
        onUpdateFeedback: updateFeedbackHandler,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
