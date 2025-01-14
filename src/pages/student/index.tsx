import { ArrowLeft, LogOut, Settings, User } from "lucide-react"
import { useState } from "react";
type Activity = {
    title: string;
    type: "hackathon" | "sesion" | "taller" | "evento";
    date: string;
};

type Club = {
    id: number;
    name: string;
    description: string;
    image: string;
    activities: Activity[];
};
const Student = () => {

    const clubs: Club[] = [
        {
            id: 1,
            name: "Club 1",
            description: "Descripción del Club 1",
            image: "https://via.placeholder.com/300x200",
            activities: [
                { title: "Hackathon Innovador", type: "hackathon", date: "2024-12-08" },
                { title: "Sesión Informativa", type: "sesion", date: "2024-12-06" },
                { title: "Taller de Desarrollo", type: "taller", date: "2024-12-10" },
            ],
        },
        // Otros clubes...
    ];

    const [enrolledClubs, setEnrolledClubs] = useState<number[]>([]);

    const handleEnroll = (clubId: number) => {
        if (!enrolledClubs.includes(clubId)) {
            setEnrolledClubs([...enrolledClubs, clubId]);
            alert(`¡Te has inscrito a ${clubs.find(club => club.id === clubId)?.name}!`);
        } else {
            alert("Ya estás inscrito en este club.");
        }
    };

    const [selectedClub, setSelectedClub] = useState<Club | null>(null);

    const sortedActivities = (activities: Activity[]): Activity[] =>
        activities.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return (
        <div className="w-full h-full mb-5">
            <div className="bg-gray-900 h-fit py-10 px-10 text-white">
                <div className="bg-gray-700 px-10 opacity-40 text-white py-5 rounded-md flex flex-row gap-6 justify-between">
                    <span className="text-xl font-bold">Welcome!</span>
                    <div className="flex flex-row gap-5">
                        <Settings />
                        <div className="h-25 bg-gray-100 w-0.5" />
                        <User />
                        <span>Alejandro Gonzalez</span>
                        <LogOut />
                    </div>
                </div>
                <div className="w-full h-10 relative mt-5">
                    <div className="absolute h-64 left-0 top-0 bottom-0 right-0 rounded-md">
                        <img
                            className="w-full h-full object-cover rounded-md"
                            src="https://www.independentschoolparent.com/wp-content/uploads/2022/09/My-project-1-88.png"
                            alt="Background"
                        />

                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-md"></div>
                    </div>
                    <div className="absolute top-16 left-10 h-full flex flex-row">
                        <img
                            className="h-32 w-32 rounded"
                            src="https://upload.wikimedia.org/wikipedia/commons/1/14/Escudo_UNEATLANTICO.jpg"
                            alt="Logo"
                        />
                        <div className="pl-5 mt-5">
                            <h1 className="text-3xl font-bold">Universidad Europea del Atlantico</h1>
                            <p className="text-lg mt-2">
                                Calle Isabel Torres 14, Santander, Cantabria
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-56 mx-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl text-black">
                        {selectedClub ? selectedClub.name : "Clubes"}
                    </h2>
                    {selectedClub && (
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={() => setSelectedClub(null)}
                        >
                            Regresar
                        </button>
                    )}
                </div>
                <div className="w-full bg-gray-400 h-0.5 mt-1" />

                {!selectedClub ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {clubs.map((club) => (
                            <div
                                key={club.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
                                onClick={() => setSelectedClub(club)}
                            >
                                <img
                                    src={club.image}
                                    alt={club.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800">{club.name}</h3>
                                    <p className="text-gray-600">{club.description}</p>
                                    <button
                                        className={`mt-4 px-4 py-2 text-sm font-semibold rounded ${enrolledClubs.includes(club.id) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                                            }`}
                                        onClick={() => handleEnroll(club.id)}
                                    >
                                        {enrolledClubs.includes(club.id) ? "Inscrito" : "Inscribirse"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-gray-800">
                                Actividades de {selectedClub.name}
                            </h2>
                            <div className="mt-4 space-y-4">
                                {sortedActivities(selectedClub.activities).map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-4 border-b pb-4"
                                    >
                                        <div className="text-sm text-gray-600">{activity.date}</div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {activity.title}
                                            </h3>
                                            <span
                                                className={`inline-block px-2 py-1 text-sm font-medium text-white rounded ${activity.type === "hackathon"
                                                    ? "bg-blue-500"
                                                    : activity.type === "sesion"
                                                        ? "bg-green-500"
                                                        : activity.type === "taller"
                                                            ? "bg-yellow-500"
                                                            : "bg-purple-500"
                                                    }`}
                                            >
                                                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Student