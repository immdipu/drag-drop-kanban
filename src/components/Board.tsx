"use client";
import React from "react";
import Columns from "./Columns";

const Board = () => {
  const [data, setData] = React.useState<IDate[]>(defaultData);
  return (
    <div className="grid grid-cols-3 gap-x-5 mx-auto text-white  h-full  w-full max-w-5xl ">
      <Columns
        title="Todo"
        headingColor="#b3b3ff"
        data={data}
        setData={setData}
        type="todo"
      />

      <Columns
        title="In Progress"
        headingColor="#7dbd57"
        data={data}
        setData={setData}
        type="progress"
      />
      <Columns
        title="Completed"
        headingColor="#ffaeae"
        data={data}
        setData={setData}
        type="done"
      />
    </div>
  );
};

export default Board;

const defaultData: IDate[] = [
  {
    id: 1,
    title: "Learn React",
    type: "todo",
  },
  {
    id: 2,
    title: "Learn Vue",
    type: "progress",
  },
  {
    id: 3,
    title: "Learn Angular",
    type: "done",
  },
  {
    id: 4,
    title: "Learn Svelte",
    type: "todo",
  },
  {
    id: 5,
    title: "Learn Next",
    type: "progress",
  },
  {
    id: 6,
    title: "Learn Nuxt",
    type: "done",
  },
];
