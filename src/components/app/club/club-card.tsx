import { Club as ClubModel } from "@/interfaces/Club";
import React from "react";
import ClubTags from "./club-tags";

interface IClubCardProps {
    club: ClubModel;
}
const ClubCard = ({ club }: IClubCardProps) => {
    return (
        <div className="w-1/3 p-2">
            <div className="h-full flex flex-col px-4 py-5 border border-gray-300 rounded-xl">
                <div className="font-bold text-xl mb-2">
                    {club.name}
                </div>
                <div className="text-gray-400 mb-3 flex-grow">
                    {club.description}
                </div>
                <div className="mt-auto">
                    <ClubTags tags={club.tags} />
                </div>
            </div>
        </div>
    );
}


export default ClubCard;
