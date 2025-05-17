import ManageProducts from "@/components/dashboard/adminDashboard/ManageProducts";


const ManageProductsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <div className="">
            <ManageProducts userId={id} />
        </div>
    );
};

export default ManageProductsPage;
