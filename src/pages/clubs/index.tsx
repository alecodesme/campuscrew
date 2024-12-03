import { useEffect, useState } from "react";
import { UniversityService } from "@/services/universityService";
import Layout from "@/components/app/Layout";
import { Club } from "@/interfaces/Club";
import { useAuth } from "@/context/AuthContext";
import ClubCard from "@/components/app/club/club-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateClubForm from "@/components/app/dialogs/clubs/CreateClub";

const ClubsPage = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
    const { university } = useAuth()
    const [openCreateClub, setOpenCreateClub] = useState(false)

    const universityService = new UniversityService();

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const data = await universityService.fetchAllClubsByUniversity(university!.id!);
                setClubs(data);
                setClubs(data);
            } catch (error) {
                setClubs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    useEffect(() => {
        if (search) {
            setFilteredClubs(
                clubs.filter((club: Club) =>
                    club.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredClubs(clubs);
        }
    }, [search, clubs]);

    const handleClubCreation = (newClub: Club) => {
        setClubs((prevClubs) => [...prevClubs, newClub]);
    };

    return (
        <Layout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="p-0 h-full w-full">
                    <h1 className="text-2xl font-bold mb-4 pl-2">Mis clubs</h1>

                    <div className="mb-4 p-2 flex space-x-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Buscar clubs por nombre"
                        />
                        <Dialog
                            onOpenChange={(open) => {
                                setOpenCreateClub(open)
                            }}
                            open={openCreateClub}>
                            <DialogTrigger>
                                <div onClick={() => {
                                    setOpenCreateClub(true)
                                }} className="px-5 content-center h-full bg-black text-white rounded-lg focus:outline-none">
                                    Crear
                                </div>
                            </DialogTrigger>
                            <CreateClubForm setOpenCreateClub={setOpenCreateClub} onCreatedClub={handleClubCreation} />
                        </Dialog>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="h-full overflow-y-auto w-full flex flex-wrap">
                                {
                                    filteredClubs.length === 0 ? (
                                        <div className="text-center text-gray-500 w-full">No hay datos</div>
                                    ) :
                                        filteredClubs.map((club: Club) => (
                                            <ClubCard club={club} key={club.id} />
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ClubsPage;
