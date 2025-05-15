import ManageBrand from "../../../components/admin/ManageBrand";
import ManageCategory from "../../../components/admin/ManageCategory";

const ManageCommon = () => {
    

    return (
        <>
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <ManageBrand/>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <ManageCategory/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageCommon;
