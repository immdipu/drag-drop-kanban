import React, { FC } from "react";
import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

interface ICard extends IDate {
  handleDragStart: Function;
}

const Card: FC<ICard> = ({ id, title, type, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} type={type} />
      <div
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, type })}
        className="bg-neutral-700 bg-opacity-70 shadow-none px-3 text-sm text-neutral-100 py-3 rounded-lg"
      >
        <p>{title}</p>
      </div>
    </>
  );
};

export default Card;
