import { Popover, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";

interface Props {
  buttonEl: ReactNode;
}
export const Popper: FC<Props> = ({ children, buttonEl }) => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button className={`${open ? "" : "text-opacity-90"}`}>
          {buttonEl}
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              {children}
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);
