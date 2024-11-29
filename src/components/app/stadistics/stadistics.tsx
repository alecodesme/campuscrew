import { Landmark, Building, Users, GraduationCap } from "lucide-react";

const Statistics = () => {
    return (
        <div className="bg-blue-600 text-white flex flex-col md:flex-row  md:justify-between items-start gap-10 md:gap-0 md:items-center p-6 px-5 md:px-20">
            {/* Primer bloque */}
            <div className="flex items-center gap-2">
                <Landmark className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">7</p>
                    <p className="text-sm">Facultades & Programas Asociados</p>
                </div>
            </div>

            <div className="border-l hidden md:block border-white h-10"></div>

            {/* Segundo bloque */}
            <div className="flex items-center gap-2">
                <Building className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">133</p>
                    <p className="text-sm">Programas Estudiados</p>
                </div>
            </div>

            <div className="border-l hidden md:block border-white h-10"></div>

            {/* Tercer bloque */}
            <div className="flex items-center gap-2">
                <Users className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">37608</p>
                    <p className="text-sm">Total Matriculados (BA, MA, PhD, etc.)</p>
                </div>
            </div>

            <div className="border-l hidden md:block border-white h-10"></div>

            {/* Cuarto bloque */}
            <div className="flex items-center gap-2">
                <GraduationCap className="text-white" size={32} />
                <div>
                    <p className="text-2xl font-semibold">1236</p>
                    <p className="text-sm">Graduados</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;