import { useEffect, useState } from "react";
import { University } from "@/interfaces/University";
import { UniversityService } from "@/services/universityService";
import Layout from "@/components/app/Layout";

const UniversitiesPage = () => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);

    const universityService = new UniversityService();

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

    const handleAction = (id: number, action: 'accepted' | 'declined') => {
        setUniversities((prevUniversities) =>
            prevUniversities.map((uni) =>
                uni.id === id
                    ? { ...uni, status: action }
                    : uni
            )
        );
    };

    return (
        <Layout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="container mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-4">Universidades</h1>

                    {/* Buscador */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Buscar universidad por nombre"
                        />
                    </div>

                    {/* Tabla de universidades */}
                    <div className="overflow-x-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="flex bg-gray-100 p-3 border-b">
                                <div className="w-1/4 font-semibold text-sm text-gray-700">Nombre</div>
                                <div className="w-1/4 font-semibold text-sm text-gray-700">Dirección</div>
                                <div className="w-1/4 font-semibold text-sm text-gray-700">País</div>
                                <div className="w-1/4 font-semibold text-sm text-gray-700">Estado</div>
                                <div className="w-1/4 font-semibold text-sm text-gray-700">Acciones</div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {
                                    filteredUniversities.length === 0 ? (
                                        <div className="text-center text-gray-500 p-4">No hay datos</div>
                                    ) :
                                        filteredUniversities.map((university) => (
                                            <div
                                                key={university.id}
                                                className="flex items-center border-b p-3 hover:bg-gray-50"
                                            >
                                                <div className="w-1/4 text-sm text-gray-700">{university.name}</div>
                                                <div className="w-1/4 text-sm text-gray-700">{university.address}</div>
                                                <div className="w-1/4 text-sm text-gray-700">{university.country}</div>
                                                <div className="w-1/4">
                                                    {/* Chip de estado */}
                                                    <span
                                                        className={`px-3 py-1 text-sm rounded-full 
                                            ${university.status === "accepted" ? "bg-green-200 text-green-800" :
                                                                university.status === "declined" ? "bg-red-200 text-red-800" :
                                                                    "bg-yellow-200 text-yellow-800"}`}
                                                    >
                                                        {university.status || "Pendiente"}
                                                    </span>
                                                </div>
                                                <div className="w-1/4">
                                                    {/* Botones de acción */}
                                                    <button
                                                        onClick={() => handleAction(university.id!, "accepted")}
                                                        className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                                                    >
                                                        Aceptar
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(university.id!, "declined")}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        Declinar
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default UniversitiesPage;
