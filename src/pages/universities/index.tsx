import Layout from "@/components/app/Layout"
import withRoleProtection from "@/hoc/hoc";

const University = () => {
    return <Layout>
    <div>
        uni
    </div>
</Layout>
}   


export default withRoleProtection(University, ['university']);