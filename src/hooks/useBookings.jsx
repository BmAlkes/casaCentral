import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../Context/userDetailsContext";
import { getAllBookings } from "../utils/api";
import { useQuery } from "react-query";

export const useBookings = () => {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const queryRef = useRef();
    const { user } = useAuth0();
  
    const { data, isLoading, isError, refetch } = useQuery({
      queryKey: "allBookings",
      queryFn: () => getAllBookings(user?.email, userDetail?.token),
      onSuccess: (data) => setUserDetail((prev) => ({...prev, 
        bookings: data})),
      enabled: user!==undefined,
      staleTime: 30000
    });
  
    queryRef.current = refetch;
  
    useEffect(() => {
      queryRef.current && queryRef.current();
    }, [userDetail?.token]);
    return { data, isError, isLoading, refetch };
  };