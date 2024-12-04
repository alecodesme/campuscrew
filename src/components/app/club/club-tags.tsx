interface IClubTagsProps {
    tags?: string;
}

const ClubTags = ({ tags = "" }: IClubTagsProps) => {
    const tagsArray = tags.split(",").map(tag => tag.trim());

    return (
        <div className="flex flex-wrap gap-2 my-2">
            {tagsArray.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-200 rounded-lg text-sm text-blue-700">
                    {tag}
                </span>
            ))}
        </div>
    );
};

export default ClubTags;