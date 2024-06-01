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
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setDragging(false);
    ClearHighlights();
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";
    if (before === cardId) return;
    let copy = [...data];
    let cardToTransfer = copy.find((c) => c.id === Number(cardId));
    if (!cardToTransfer) return;
    cardToTransfer = { ...cardToTransfer, type };
    copy = copy.filter((c) => c.id !== Number(cardId));
    const moveToBack = before === "-1";
    if (moveToBack) {
      copy.push(cardToTransfer);
    } else {
      const insertAtIndex = copy.findIndex((el) => el.id === Number(before));
      if (insertAtIndex === undefined) return;
      copy.splice(insertAtIndex, 0, cardToTransfer);
    }
    setData(copy);
  };

  const hanldeDragLeave = (e: DragEvent) => {
    ClearHighlights();
    setDragging(false);
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_THRESHOLD = 50;
    const el = indicators.reduce(
      (prev, current) => {
        const rect = current.getBoundingClientRect();
        const offset = e.clientY - (rect.top + DISTANCE_THRESHOLD);

        if (offset < 0 && offset > prev.offset) {
          return { offset: offset, element: current };
        } else {
          return prev;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

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
