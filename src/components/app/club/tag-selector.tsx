import { X } from "lucide-react";
import React from "react";

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
            onChange(selectedTags.filter((t) => t !== tag));
        } else {
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
                        className={`px-4 py-2 rounded-full text-xs font-medium cursor-pointer flex items-center space-x-2  ${selectedTags.includes(tag) ? 'bg-blue-100' : 'bg-gray-100'} text-black`}
                        onClick={() => handleTagChange(tag)}
                    >
                        <span>{tag}</span>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;