import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../Context/userDetailsContext";
import { useMutation } from "react-query";
import { createUser } from "../utils/api";
import useFavorites from "../hooks/useFavorites";
import { useBookings } from "../hooks/useBookings";

const Layout = () => {
  useFavorites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetail } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });
        // Opcional: salvar no localStorage corretamente
        localStorage.setItem("access_token", token);
        // Salvar token no estado
        setUserDetail((prev) => ({ ...prev, token }));
        // Passar o token diretamente para mutate
        mutate(token);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
