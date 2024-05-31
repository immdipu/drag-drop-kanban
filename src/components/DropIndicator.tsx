import React, { FC } from "react";

interface DropIndicatorProps {
  beforeId: number | null;
  type: TType;
}

const DropIndicator: FC<DropIndicatorProps> = ({ beforeId, type }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-type={type}
      className="my-0.5 h-0.5 w-full bg-blue-600 opacity-0"
    />
  );
};

export default DropIndicator;
