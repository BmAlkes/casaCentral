import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import useAuthCheck from "../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../Context/userDetailsContext";
import { toFav } from "../utils/api";
import { checkFavorites, updateFavorites } from "../utils/common";

const HeartBtn = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetail: { token, favorites },
    setUserDetail,
  } = useContext(UserDetailContext);

  useEffect(()=>{
    setHeartColor(()=> checkFavorites(id, favorites))
  },[favorites])

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user.email, token),
    onSuccess: () => {
      setUserDetail((prev) => ({
        ...prev,
        favorites: updateFavorites(id, prev.favorites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin) {
      mutate();
      setHeartColor((prev) => (prev === "#f51919" ? "white" : "#f51919"));
    }
  };

  return (
    <FaHeart
      color={heartColor}
      size={23}
      className=" cursor-pointer drop-shadow-sm "
      onClick={(e) => {
        e.stopPropagation(), handleLike();
      }}
    />
  );
};

export default HeartBtn;
