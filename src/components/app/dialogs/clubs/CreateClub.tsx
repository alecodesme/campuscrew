import { useEffect, useState } from "react";
import TagSelector from "../../club/tag-selector";
import { Club } from "@/interfaces/Club";
import { DialogContent } from "@/components/ui/dialog";

interface CreateClubFormProps {
    onCreatedClub: (club: Club) => void;
    setOpenCreateClub: (open: boolean) => void;
}

const CreateClubForm = ({ onCreatedClub, setOpenCreateClub }: CreateClubFormProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [universityId, setUniversityId] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [selectedTags, setTags] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const availableTags: string[] = ["technology", "robotics", "science", "art", "music"];
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const validateFields = () => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setName("");
        setDescription("");
        setEmail("");
        setIsActive(false);
        setTags([]);
        setErrors({});
        setIsFormValid(false);
    };

    useEffect(() => {
        const allFieldsValid =
            name.trim() &&
            description.trim() &&
            email.trim() &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsFormValid((allFieldsValid && Object.keys(errors).length === 0) as boolean);
    }, [name, description, universityId, email, errors]);

    const handleSubmit = () => {
        setIsLoading(true)
        if (!validateFields()) return;

        const tagsString = selectedTags.join(", ");
        const newClub: Club = {
            name,
            description,
            university_id: -1,
            email,
            is_active: isActive,
            tags: tagsString,
        };

        console.log("Nuevo club creado:", newClub);
        clearForm()
        onCreatedClub(newClub);
        setOpenCreateClub(false)

    };

    return (
        <DialogContent className="bg-white text-black">
            <div className="mb-4">
                <label className="font-bold">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full p-2 border rounded-lg mt-2 ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Club Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label className="font-bold">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full p-2 border rounded-lg mt-2 ${errors.description ? "border-red-500" : ""}`}
                    placeholder="Description of the club"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="mb-4">
                <label className="font-bold">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2 border rounded-lg mt-2 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label className="font-bold mb-2 block">Is Active:</label>
                <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => setIsActive(!isActive)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                    <span>{isActive ? "Active" : "Inactive"}</span>
                </div>
            </div>

            <TagSelector
                availableTags={availableTags}
                selectedTags={selectedTags}
                onChange={setTags}
            />

            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`px-4 py-2 rounded-lg w-full text-white ${isFormValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
                >
                    {
                        isLoading ? 'Cargando...' : 'Create Club'
                    }
                </button>
            </div>
        </DialogContent >
    );
};

export default CreateClubForm;
