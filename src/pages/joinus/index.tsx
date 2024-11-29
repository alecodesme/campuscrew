import React, { useState } from "react";
import Navbar from "@/components/app/navbar/navbar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UniversityService } from "@/services/universityService";
import { University } from "@/interfaces/University";

const JoinUs = () => {
    const universityService = new UniversityService();
    const [formData, setFormData] = useState<University>({
        name: "",
        cellphone: "",
        country: "",
        province: "",
        address: "",
        city: "",
        email: "",
        domain: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");
        try {
            await universityService.createUniversity(formData);
            alert("University registered successfully!");
        } catch (err) {
            setError("Failed to register. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="w-full flex flex-row">
                <div className="flex-1">
                    <img src="https://www.stjohns.edu/sites/default/files/styles/640w/public/2022-09/20220908_activitiesfair_94_960x640.jpg?itok=a2fwA-2j" />
                </div>
                <div className="flex-1 flex flex-col justify-center pl-12 pr-40 gap-5">
                    <div className="text-4xl font-extrabold text-black">Join Us!</div>
                    <div className="text-gray-400">
                        Connect your students, foster creativity, and build strong communities through student clubs.
                        Sign up today and take the university experience to the next level 🙌🏽.
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col p-12">
                <div className="flex flex-col text-black py-5">
                    <span className="text-sm">Step 1</span>
                    <span className="text-lg">General Info</span>
                    <div className="border bg-gray-200 w-full h-[1px]"></div>
                </div>
                <div className="flex flex-col gap-3">
                    <Input
                        placeholder="University name"
                        type="text"
                        className="text-black w-1/3"
                        onChange={(event) => handleChange("name", event.target.value)}
                    />
                    <Input
                        placeholder="University cellphone"
                        type="number"
                        className="text-black w-1/3"
                        onChange={(event) => handleChange("cellphone", event.target.value)}
                    />
                    <Input
                        placeholder="Email contact"
                        type="text"
                        className="text-black w-1/3"
                        onChange={(event) => handleChange("email", event.target.value)}
                    />
                </div>
                <div className="flex flex-col text-black py-5">
                    <span className="text-sm">Step 2</span>
                    <span className="text-lg">Address Info</span>
                    <div className="border bg-gray-200 w-full h-[1px]"></div>
                </div>
                <Input
                    placeholder="University address"
                    type="text"
                    className="text-black w-1/3 mb-5"
                    onChange={(event) => handleChange("address", event.target.value)}
                />
                <div className="flex flex-row gap-3">

                    <div>
                        <span className="text-sm text-black">Country</span>
                        <Select onValueChange={(value) => handleChange("country", value)}>
                            <SelectTrigger className="w-[180px] text-black">
                                <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    <SelectItem value="usa">USA</SelectItem>
                                    <SelectItem value="canada">Canada</SelectItem>
                                    <SelectItem value="uk">UK</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <span className="text-sm text-black">Province</span>
                        <Select onValueChange={(value) => handleChange("province", value)}>
                            <SelectTrigger className="w-[180px] text-black">
                                <SelectValue placeholder="Select a province" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Provinces</SelectLabel>
                                    <SelectItem value="california">California</SelectItem>
                                    <SelectItem value="ontario">Ontario</SelectItem>
                                    <SelectItem value="london">London</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <span className="text-sm text-black">City</span>
                        <Select onValueChange={(value) => handleChange("city", value)}>
                            <SelectTrigger className="w-[180px] text-black">
                                <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Cities</SelectLabel>
                                    <SelectItem value="newyork">New York</SelectItem>
                                    <SelectItem value="toronto">Toronto</SelectItem>
                                    <SelectItem value="manchester">Manchester</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col text-black py-5">
                    <span className="text-sm">Step 3</span>
                    <span className="text-lg">Domain Info</span>
                    <div className="border bg-gray-200 w-full h-[1px]"></div>
                </div>
                <Input
                    placeholder="Domain name"
                    type="text"
                    className="text-black w-1/3"
                    onChange={(event) => handleChange("domain", event.target.value)}
                />
                <div className="flex flex-row gap-3 mt-5">
                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    //onClick={() => }
                    >
                        Cancel
                    </button>
                    <button
                        className={`px-6 py-2 rounded text-white ${isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Continue"}
                    </button>
                </div>
                {error && <div className="text-red-500 mt-3">{error}</div>}
            </div>
        </div>
    );
};

export default JoinUs;