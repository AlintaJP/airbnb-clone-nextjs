import Image from "next/image";
import React from "react";
import { ExploreData } from "../typings";

type Props = ExploreData;

const SmallCard = ({ img, location, distance }: Props) => {
  return (
    <div
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl
      cursor-pointer hover:bg-gray-100 hover:scale-105 transition
      transform duration-200 ease-out"
    >
      <div className="relative h-16 w-16">
        <Image src={img} layout="fill" alt={location} className="rounded-lg" />
      </div>

      <div>
        <h3>{location}</h3>
        <h4 className="text-gray-500">{distance}</h4>
      </div>
    </div>
  );
};

export default SmallCard;
