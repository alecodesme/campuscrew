import Layout from "@/components/app/Layout"
import { useAuth } from "@/context/AuthContext"
const Admin = () => {
    const { user } = useAuth()
    return <Layout>
        <div className="w-full h-full">
            <div className="flex flex-row gap-1 text-2xl mt-3">Welcome <div className="font-bold">{user?.name}!</div></div>
            <div className="flex flex-row mt-5 gap-2">
                <div className="w-1/3 p-10 border bg-white  border-gray-300 rounded-md gap-2 flex-col">

                    <span className="text-gray-400">Universidades aceptadas</span>
                    <div className="font-bold text-2xl">10</div>
                </div>

                <div className="w-1/3 p-10 border bg-white border-gray-300 rounded-md gap-2 flex-col">

                    <span className="text-gray-400">Universidades rechazadas</span>
                    <div className="font-bold text-2xl">10</div>
                </div>
                <div className="w-1/3 p-10 border bg-white border-gray-300 rounded-md gap-2 flex-col">

                    <span className="text-gray-400">Universidades pendientes</span>
                    <div className="font-bold text-2xl">10</div>
                </div>
            </div>

        </div>
    </Layout>
}

export default Admin
