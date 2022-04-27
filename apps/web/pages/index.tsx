import { parkingSlots } from "consts";
import { useMemo, useState } from "react";
import { NoSSR } from "../components/NoSSR";
import { ParkingCell, ParkingGrid } from "../components/ParkingGrid";
import { useToggle } from "../components/useToggle";

export default function Web() {
  const { state, toggle } = useToggle();

  const feeCollected = useMemo(() => {
    return parkingSlots.reduce((acc, ps) => acc + ps.totalCharged, 0);
  }, [parkingSlots, state]);

  return (
    <main className="flex flex-col max-w-sm mx-auto justify-center h-screen pb-40">
      <div>
        <ParkingGrid>
          {parkingSlots.map((ps) => (
            <ParkingCell key={ps.id} parkingSlot={ps} update={toggle} />
          ))}
        </ParkingGrid>
      </div>
      <div className="self-end my-2">
        <h2 className="text-sm">Total Fee Collected</h2>
        <p className="text-right text-xs font-semibold">₱ {feeCollected}</p>
      </div>
      {/* {entryPoints.map(([x, y]) => (  <div    style={{      top: `${y ? (y - 1) * 40 + (y - 1) * 12 : 0}px`,      left: `${x ? (x - 1) * 40 + (x - 1) * 12 : 0}px`,    }}    className="absolute h-10 w-2 bg-yellow-300"  ></div>))} */}
      {/* <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Warrior</button> */}
    </main>
  );
}
