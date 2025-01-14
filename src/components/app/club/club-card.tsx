import { Club as ClubModel } from "@/interfaces/Club";
import React from "react";
import ClubTags from "./club-tags";
import { Pencil, Trash } from "lucide-react";

interface IClubCardProps {
    club: ClubModel;
    onEditAction: () => void;
    onDeleteAction: () => void;
}
const ClubCard = ({ club, onEditAction, onDeleteAction }: IClubCardProps) => {
    return (
        <div className="w-1/3 p-2">
            <div className="flex bg-white flex-col px-4 py-5 border border-gray-300 rounded-xl">
                <div className="font-bold text-xl mb-2 flex flex-row justify-between items-center">
                    <div>
                        {club.name}
                    </div>
                    <div className="flex flex-row gap-2">
                        <div>
                            <Pencil onClick={onEditAction} className="cursor-pointer" size={15} />
                        </div>
                        <Trash onClick={onDeleteAction} className="cursor-pointer" size={15} />
                    </div>

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
