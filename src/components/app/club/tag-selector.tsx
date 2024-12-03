import { X } from "lucide-react";
import React, { useState } from "react";

interface TagSelectorProps {
    availableTags: string[];
    selectedTags: string[];
    onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
    availableTags,
    selectedTags,
    onChange,
}) => {
    const handleTagChange = (tag: string) => {
        if (selectedTags.includes(tag)) {
            // Remover el tag si ya está seleccionado
            onChange(selectedTags.filter((t) => t !== tag));
        } else {
            // Agregar el tag si no está seleccionado
            onChange([...selectedTags, tag]);
        }
    };

    return (
        <div className="mb-4">
            <label className="font-bold block mb-2">Tags:</label>
            <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                    <div
                        key={tag}
                        className={`px-4 py-2 rounded-full text-xs font-medium cursor-pointer flex items-center space-x-2 bg-gray-100 text-black`}
                        onClick={() => handleTagChange(tag)}
                    >
                        <span>{tag}</span>
                        {selectedTags.includes(tag) && (
                            <span
                                className="rounded-full text-xs w-5 h-5 flex justify-center items-center text-black"

                                onClick={(e) => {
                                    e.stopPropagation(); // Prevenir que se llame el handleTagChange
                                    handleTagChange(tag);
                                }}
                            >
                                <X size={15} />
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;