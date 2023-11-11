import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Authorize from "./Authorize";

function Register(props) {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    props.register();
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/around");
    }
  }, [history, props.loggedIn]);

  return (
    <Authorize
      signOut={props.signOut}
      link={props.link}
      title={props.title}
      userEmail={props.userEmail}
      userPassword={props.userPassword}
      redirect={props.redirect}
      handleSubmit={handleSubmit}
      value="¿Ya eres miembro? Inicia sesión aquí"
      setUserEmail={props.setUserEmail}
      setUserPassword={props.setUserPassword}
    />
  );
}

export default withRouter(Register);
