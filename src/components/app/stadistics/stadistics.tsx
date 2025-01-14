import { Landmark, Users, Activity, CalendarCheck } from "lucide-react";

const Statistics = () => {
    return (
        <div className="bg-blue-600 text-white flex flex-col md:flex-row md:justify-between items-start gap-10 md:gap-0 md:items-center p-6 px-5 md:px-20">
            <div className="flex items-center gap-2">
                <Landmark className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">25</p>
                    <p className="text-sm">Registered Universities</p>
                </div>
            </div>

            <div className="border-l hidden md:block border-white h-10"></div>
            <div className="flex items-center gap-2">
                <Users className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">50</p>
                    <p className="text-sm">Existing Clubs</p>
                </div>
            </div>

            <div className="border-l hidden md:block border-white h-10"></div>

            <div className="flex items-center gap-2">
                <Activity className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">10,000</p>
                    <p className="text-sm">Active Students</p>
                </div>
            </div>

            <div className="border-l hidden md:block border-white h-10"></div>

            <div className="flex items-center gap-2">
                <CalendarCheck className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">200</p>
                    <p className="text-sm">Completed Activities</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
