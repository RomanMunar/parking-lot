import { ParkingSlot as IParkingSlot } from "consts";
import { FC, useEffect, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  parkingSlot: IParkingSlot;
  update: () => void;
}
export const ParkingCell: FC<Props> = ({ parkingSlot, update, ...props }) => {
  const [hovering, setHovering] = useState(false);
  const [charge, setCharge] = useState(0);

  let vehicleEmoji;

  switch (parkingSlot.vehicle?.size) {
    case "S":
      vehicleEmoji = "🚗";
      break;
    case "M":
      vehicleEmoji = "🛻";
      break;
    case "L":
      vehicleEmoji = "🚚";
      break;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCharge(parkingSlot.calculateCharge());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onRemoveVehicleClick = () => {
    hovering && parkingSlot.vehicle?.unpark();
    setHovering(false);
    update();
  };

  return (
    <div className="relative" {...props}>
      <div className="absolute top-0 left-0 text-xs">{parkingSlot?.size}</div>
      <button
        type="button"
        className="p-1 rounded-lg h-10 w-10 flex items-center justify-center outline-none"
        style={{
          backgroundColor: parkingSlot.vehicle?.parked
            ? "rgb(248 113 113)"
            : "rgb(187 247 208)",
          cursor: parkingSlot.vehicle?.parked ? "pointer" : "auto",
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={onRemoveVehicleClick}
      >
        {hovering && parkingSlot.vehicle?.parked ? (
          <div className="flex flex-col">
            <svg
              className="w-5 h-5 self-end"
              aria-hidden="true"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10L4.293 5.707a1 1 0 0 1 0-1.414Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs whitespace-nowrap">₱ {charge}</span>
          </div>
        ) : null}

        {!hovering && parkingSlot.vehicle?.parked ? vehicleEmoji : null}
      </button>
    </div>
  );
};
