import React, { useEffect, useState } from "react";
import Header from "../components/BibliothequeHeader";
import Carts from "../components/cart";
import { useHistory } from "react-router-dom";
const Profil = () => {
  const history = useHistory();
  const online = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({});
  useEffect(() => {
    if (online != null) {
        console.log(online.content)
        setUser(online.content)
    } else {
      history.push("/");
    }
  },[]);
  return (user &&
    <div>
      <Header user={user} />
      <Carts user={user} />
    </div>
  );
};

export default Profil;
