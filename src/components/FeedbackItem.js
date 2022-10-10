import { FaTimes, FaEdit } from "react-icons/fa";
import React, { useContext } from "react";
import Card from "./shared/Card";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackItem = ({ item }) => {
  const { onDeleteFeedback, onEditFeedback } = useContext(FeedbackContext);
  const deleteFeedbackClickHandler = () => {
    onDeleteFeedback(item.id);
  };

  const editFeedbackClickHandler = () => {
    console.log("clicked");
    onEditFeedback(item);
  };
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button onClick={deleteFeedbackClickHandler} className="close">
        <FaTimes color="purple" />
      </button>
      <button onClick={editFeedbackClickHandler} className="edit">
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
};

export default FeedbackItem;
