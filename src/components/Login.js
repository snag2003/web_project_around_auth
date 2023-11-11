import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Authorize from "./Authorize";

function Login(props) {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (!props.userEmail || !props.userPassword) {
      return;
    }
    props.authorize();
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/around");
    }
  }, [history]);

  return (
    <Authorize
      signOut={props.signOut}
      link={props.link}
      title={props.title}
      userEmail={props.userEmail}
      userPassword={props.userPassword}
      redirect={props.redirect}
      handleSubmit={handleSubmit}
      value="¿Aún no eres miembro? Regístrate aquí"
      setUserEmail={props.setUserEmail}
      setUserPassword={props.setUserPassword}
    />
  );
}

export default withRouter(Login);
