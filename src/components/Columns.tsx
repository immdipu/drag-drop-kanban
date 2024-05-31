import React, {
  FC,
  SetStateAction,
  Dispatch,
  useState,
  DragEventHandler,
  DragEvent,
} from "react";
import Card from "./Card";
import clsx from "clsx";
import DropIndicator from "./DropIndicator";

type ColumnProps = {
  title: string;
  headingColor: string;
  data: IDate[];
  setData: Dispatch<SetStateAction<IDate[]>>;
  type: TType;
};

const Columns: FC<ColumnProps> = ({
  headingColor,
  title,
  data,
  setData,
  type,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleDragStart = (e: DragEvent, data: IDate) => {
    e.dataTransfer!.setData("cardId", data.id.toString());
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setDragging(true);
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    ClearHighlights(indicators);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setDragging(false);
  };

  const hanldeDragLeave = (e: DragEvent) => {
    setDragging(false);
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {};

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-type="${type}"]`)
    ) as HTMLElement[];
  };

  const ClearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((indicator) => {
      indicator.style.opacity = "0";
    });
  };

  const filteredData = data.filter((item) => item.type === type);
  return (
    <div className="w-full shrink-0 ">
      <div className="mb-3   flex items-center justify-start">
        <h3
          style={{
            color: headingColor,
          }}
          className={`font-medium text-lg`}
        >
          {title}
        </h3>
        <span className="rounded text-sm text-neutral-400"></span>
      </div>
      <div
        className={clsx(
          "space-y-3 pb-3",
          dragging ? "bg-neutral-900/35" : "bg-neutral-800/0"
        )}
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={hanldeDragLeave}
      >
        {filteredData.map((item) => {
          return (
            <Card key={item.id} {...item} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={null} type={type} />
      </div>
    </div>
  );
};

export default Columns;
