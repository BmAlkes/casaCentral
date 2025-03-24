import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../Context/userDetailsContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavorites = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavorites",
    queryFn: () => getAllFav(user?.email, userDetail?.token),
    onSuccess: (data) => setUserDetail((prev) => ({ ...prev, favorites: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;
  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetail?.token]);
  return { data, isError, isLoading, refetch };

};

export default useFavorites;
