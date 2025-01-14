import React, { useState } from "react";
import Navbar from "@/components/app/navbar/navbar";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UniversityService } from "@/services/universityService";
import { University } from "@/interfaces/University";
import Footer from "@/components/app/footer/footer";

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

    const [currentStep, setCurrentStep] = useState(1);
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

    const validateStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    formData.name.trim() !== "" &&
                    formData.cellphone.trim() !== "" &&
                    formData.email.trim() !== ""
                );
            case 2:
                return (
                    formData.address.trim() !== "" &&
                    formData.country.trim() !== "" &&
                    formData.province.trim() !== "" &&
                    formData.city.trim() !== ""
                );
            case 3:
                return formData.domain.trim() !== "";
            default:
                return false;
        }
    };

    return (
        <div className="w-full h-screen flex flex-col pb-10">
            <Navbar />
            <div className="flex flex-1">
                <div className="w-1/2 h-full">
                    <img
                        src="https://www.stjohns.edu/sites/default/files/styles/640w/public/2022-09/20220908_activitiesfair_94_960x640.jpg?itok=a2fwA-2j"
                        alt="University"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-1/2 h-full p-8 flex flex-col justify-center">
                    <div className="text-4xl font-extrabold text-black mb-6">Join Us!</div>

                    {/* Steps */}
                    {currentStep === 1 && (
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-bold text-black">Step 1: General Info</div>
                            <Input
                                placeholder="University name"
                                type="text"
                                className="text-black"
                                onChange={(event) => handleChange("name", event.target.value)}
                            />
                            <Input
                                placeholder="University cellphone"
                                type="number"
                                className="text-black"
                                onChange={(event) => handleChange("cellphone", event.target.value)}
                            />
                            <Input
                                placeholder="Email contact"
                                type="email"
                                className="text-black"
                                onChange={(event) => handleChange("email", event.target.value)}
                            />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-bold text-black">Step 2: Address Info</div>
                            <Input
                                placeholder="University address"
                                type="text"
                                className="text-black"
                                onChange={(event) => handleChange("address", event.target.value)}
                            />
                            <Select onValueChange={(value) => handleChange("country", value)}>
                                <SelectTrigger className="w-full text-black">
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
                            <Select onValueChange={(value) => handleChange("province", value)}>
                                <SelectTrigger className="w-full text-black">
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
                            <Select onValueChange={(value) => handleChange("city", value)}>
                                <SelectTrigger className="w-full text-black">
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
                    )}

                    {currentStep === 3 && (
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-bold text-black">Step 3: Domain Info</div>
                            <Input
                                placeholder="Domain name"
                                type="text"
                                className="text-black"
                                onChange={(event) => handleChange("domain", event.target.value)}
                            />
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-6">
                        {currentStep > 1 && (
                            <button
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                onClick={() => setCurrentStep(currentStep - 1)}
                            >
                                Back
                            </button>
                        )}
                        {currentStep < 3 ? (
                            <button
                                className={`px-6 py-2 rounded text-white ${validateStep() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                                    }`}
                                onClick={() => validateStep() && setCurrentStep(currentStep + 1)}
                                disabled={!validateStep()}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className={`px-6 py-2 rounded text-white ${isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Submit"}
                            </button>
                        )}
                    </div>
                    {error && <div className="text-red-500 mt-3">{error}</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default JoinUs