import Layout from "@/components/app/Layout"
import withRoleProtection from "@/hoc/hoc";

const Admin = () => {
    return <Layout>
        <div>
            ADMIN
        </div>
    </Layout>
}   

export default withRoleProtection(Admin, ['admin']);
