import React from "react";

export const Food = ({ food, onDeleteClick }) => {
  return (
    <div>
      <p>{food.name}</p>
      <button onClick={() => onDeleteClick(food)}>X</button>
    </div>
  );
};
