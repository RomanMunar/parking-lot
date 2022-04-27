import { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const ParkingGrid: FC<Props> = ({ children, ...props }) => {
  return (
    <div className="p-4 border-4 border-yellow-100">
      <div
        className={"relative grid grid-cols-5 gap-3 " + props.className}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
