import { Outlet, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import { useEffect } from "react";

const DashBoardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/show", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex">
      <SideBarComponent />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardPage;
