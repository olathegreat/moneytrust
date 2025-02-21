import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { apiClient } from "../lib/apiClient";

function ProtectedRoute() {
  // const isAuthenticated = true;
  // const token = sessionStorage.getItem("token");
  // const bearerToken = token ? "Bearer " + token : "";
  // const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiClient.get("/api/v1/auth/get-user-or-company/");
        console.log(response)
        sessionStorage.setItem(
          "sessionUserInfo",
          JSON.stringify(response?.data)
        );
        // dispatch(saveUser(response.data));

        // setUserDetails(response);
        setIsAuthenticated(true);
      } catch (err: any) {
        console.error(err.response)
        setIsAuthenticated(false);
      }
    };
    getUser();
  }, []);

  //   if(isLoading){
  //     return <div>...loading</div>;
  //   }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
