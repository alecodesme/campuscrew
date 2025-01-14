import { useEffect, useState } from "react";
import { University } from "@/interfaces/University";
import { UniversityService } from "@/services/universityService";
import Layout from "@/components/app/Layout";
import { useToast } from "@/hooks/use-toast";

const UniversitiesPage = () => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [rejectionObservation, setRejectionObservation] = useState<string>("");
    const [universityToReject, setUniversityToReject] = useState<number | null>(null);

    const universityService = new UniversityService();
    const { toast } = useToast();

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const data = await universityService.fetchAllUniversities();
                setUniversities(data);
                setFilteredUniversities(data);
            } catch (error) {
                setUniversities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    useEffect(() => {
        if (search) {
            setFilteredUniversities(
                universities.filter((uni) =>
                    uni.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredUniversities(universities);
        }
    }, [search, universities]);

    const handleAction = async (id: number, action: 'accepted' | 'rejected') => {
        if (action === 'rejected' && !rejectionObservation) {
            setUniversityToReject(id);
            setShowModal(true);
            return;
        }

        setUniversities((prevUniversities) =>
            prevUniversities.map((uni) =>
                uni.id === id ? { ...uni, status: action, observation: rejectionObservation } : uni
            )
        );

        updateUniversityStatus(id, action, rejectionObservation)
    };


    const updateUniversityStatus = async (id: number, action: 'accepted' | 'rejected', rejectionObservation?: string) => {
        try {
            const response = await universityService.updateUniversityStatus(id, action, rejectionObservation);

            if (!response.user_created) {
                toast({
                    variant: 'default',
                    className: "bg-green-500 text-white",
                    title: response.message,
                });
            } else {
                toast({
                    variant: 'default',
                    className: "bg-green-500 text-white",
                    title: "User university created!",
                });
            }
        } catch (error) {
            console.error('Failed to update university status:', error);
            setUniversities((prevUniversities) =>
                prevUniversities.map((uni) =>
                    uni.id === id ? { ...uni, status: prevUniversities.find(u => u.id === id)?.status } : uni
                )
            );
        }
    }

    const handleRejectObservation = async () => {
        if (universityToReject && rejectionObservation) {
            setShowModal(false);
            setRejectionObservation("");
            handleAction(universityToReject, 'rejected');
        }
    };

    return (
        <Layout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-4">Universities</h1>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Search university"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="grid grid-cols-6 bg-gray-100 p-3 border-b">
                                <div className="font-semibold text-sm text-gray-700 mx-2">Name</div>
                                <div className="font-semibold text-sm text-gray-700 mx-2">Address</div>
                                <div className="font-semibold text-sm text-gray-700 mx-2">Email</div>
                                <div className="font-semibold text-sm text-gray-700 mx-2">Country</div>
                                <div className="font-semibold text-sm text-gray-700 mx-2">State</div>
                                <div className="font-semibold text-sm text-gray-700 mx-2">Actions</div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {filteredUniversities.length === 0 ? (
                                    <div className="text-center text-gray-500 p-4">No data.</div>
                                ) : (
                                    filteredUniversities.map((university) => (
                                        <div
                                            key={university.id}
                                            className="grid grid-cols-6 items-center border-b p-3 hover:bg-gray-50"
                                        >
                                            <div className="text-sm text-gray-700 break-words mx-2">{university.name}</div>
                                            <div className="text-sm text-gray-700 break-words mx-2">{university.address}</div>
                                            <div className="text-sm text-gray-700 break-words mx-2">{university.email}</div>
                                            <div className="text-sm text-gray-700 break-words mx-2">{university.country}</div>
                                            <div>
                                                <span
                                                    className={`px-3 py-1 text-sm rounded-full ${university.status === "accepted"
                                                        ? "bg-green-200 text-green-800"
                                                        : university.status === "rejected"
                                                            ? "bg-red-200 text-red-800"
                                                            : "bg-yellow-200 text-yellow-800"
                                                        }`}
                                                >
                                                    {university.status || "Pending"}
                                                </span>
                                            </div>
                                            <div>
                                                {university.status === "pending" ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleAction(university.id!, "accepted")}
                                                            className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(university.id!, "rejected")}
                                                            className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                ) : university.status === "accepted" && university.user_id != null ? (
                                                    <button
                                                        onClick={() => {
                                                            setUniversities((prevUniversities) =>
                                                                prevUniversities.map((uni) =>
                                                                    uni.id === university.id ? { ...uni, status: "rejected", observation: rejectionObservation } : uni
                                                                )
                                                            );

                                                            updateUniversityStatus(university.id!, "rejected", rejectionObservation)
                                                        }}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        Deactivate
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAction(university.id!, "accepted")}
                                                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        Activate
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Rejection Observation</h2>
                        <textarea
                            value={rejectionObservation}
                            onChange={(e) => setRejectionObservation(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-4"
                            placeholder="Please provide a reason for rejection..."
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRejectObservation}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default UniversitiesPage;
