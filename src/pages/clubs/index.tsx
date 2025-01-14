import { useEffect, useState } from "react";
import { UniversityService } from "@/services/universityService";
import Layout from "@/components/app/Layout";
import { Club } from "@/interfaces/Club";
import { useAuth } from "@/context/AuthContext";
import ClubCard from "@/components/app/club/club-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ClubForm from "@/components/app/dialogs/clubs/ClubForm";
import { ClubService } from "@/services/clubService";
import { useToast } from "@/hooks/use-toast";

const ClubsPage = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
    const [openModalClub, setOpenModalClub] = useState(false)
    const [openModalDeleteClub, setOpenModalDeleteClub] = useState(false)
    const [club, setClub] = useState<Club | null>(null)
    const [mode, setMode] = useState<'create' | 'edit'>('create')

    const universityService = new UniversityService();
    const clubService = new ClubService();

    const { university } = useAuth()
    const { toast } = useToast()

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
    const handleClubEdited = (updatedClub: Club, clubId: number) => {
        setClubs((prevClubs) =>
            prevClubs.map((club) =>
                club.id === clubId ? { ...club, ...updatedClub } : club
            )
        );
    };
    const handleClubDeleted = (clubId: number) => {
        setClubs((prevClubs) =>
            prevClubs.filter((club) => club.id !== clubId)
        );
    };

    return (
        <Layout>
            <Dialog
                onOpenChange={(open) => {
                    setClub(null)
                    setOpenModalClub(open)
                }}
                open={openModalClub}>

                <ClubForm
                    onEditedClub={(club) => handleClubEdited(club, club.id!)}
                    isOpen={openModalClub}
                    club={club!}
                    mode={mode}
                    setOpenCreateClub={setOpenModalClub} onCreatedClub={handleClubCreation} />
            </Dialog>
            <Dialog
                onOpenChange={(open) => {
                    setClub(null)
                    setOpenModalDeleteClub(open)
                }}
                open={openModalDeleteClub}

            >
                <DialogContent className="bg-red-500 text-white border-0">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="text-white">
                            This action cannot be undone. This will permanently delete your club and events and activities.
                        </DialogDescription>
                        <div className="flex flex-row gap-2">
                            <div onClick={async () => {
                                const response = await clubService.deleteClub(club?.id!)
                                if (response.status) {
                                    handleClubDeleted(club?.id!)
                                    toast({
                                        variant: 'default',
                                        className: "bg-green-500 text-white",
                                        title: 'Deleted club succesfully!',
                                    })
                                } else {
                                    toast({
                                        variant: 'default',
                                        className: "bg-green-500 text-white",
                                        title: 'Unable to delete club',
                                    })
                                }
                                setOpenModalDeleteClub(false)
                            }} className="font-bold cursor-pointer w-20 text-center bg-red-400 px-2 py-2 rounded text-sm mt-4">
                                Yes
                            </div>
                            <div onClick={() => {
                                setClub(null)
                                setOpenModalDeleteClub(false)
                            }} className="font-bold cursor-pointer bg-red-400  text-center w-20 px-2 py-2 rounded text-sm mt-4">
                                Cancel
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            ) : (

                <div className="p-0 h-full w-full overflow-y-hidden">
                    <h1 className="text-2xl font-bold pl-2">Your clubs</h1>

                    <div className="p-2 flex flex-row gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Search clubs"
                        />

                        <div onClick={() => {
                            setMode('create')
                            setOpenModalClub(true)
                        }} className="px-5 content-center cursor-pointer bg-black text-white rounded-lg focus:outline-none">
                            Crear
                        </div>
                    </div>

                    <div className="rounded-lg h-full overflow-hidden">
                        <div className="h-full overflow-y-auto w-full flex flex-wrap" style={{ maxHeight: "675px" }}>
                            {
                                filteredClubs.length === 0 ? (
                                    <div className="text-center text-gray-500 w-full">No data.</div>
                                ) :
                                    filteredClubs.map((club: Club) => (
                                        <ClubCard
                                            onEditAction={() => {
                                                setMode('edit')
                                                setClub(club)
                                                setOpenModalClub(true)
                                            }}
                                            onDeleteAction={() => {
                                                setClub(club)
                                                setOpenModalDeleteClub(true)
                                            }}
                                            club={club} key={club.id} />
                                    ))
                            }
                        </div>
                    </div>
                </div>
            )
            }
        </Layout >
    );
};

export default ClubsPage;
