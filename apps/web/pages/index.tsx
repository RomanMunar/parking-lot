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
    </main>
  );
}
