import Image from "next/image";
import Stepper from "./enrollment/page";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div className="bg-gray-950 h-screen">
      </div>
      <div className="mt-16">
        <Stepper />
      </div>
    </div>
  );
}
