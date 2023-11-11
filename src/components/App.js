import React from "react";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import AroundUs from "./AroundUs";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  //login
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [authPopupState, setAuthPopupState] = React.useState(false);
  const [mode, setMode] = React.useState(false);
  const [message, setMessage] = React.useState({ message: "" });

  //userInfo
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const history = useHistory();

  //resetForm
  function resetForm() {
    setUserEmail("");
    setUserPassword("");
  }

  //login
  function closePopup() {
    setAuthPopupState(false);
  }

  function renderSuccess() {
    setMode(true);
    setAuthPopupState(true);
    setMessage({ message: "¡Correcto! Ya estás registrado." });
  }

  function renderFailure() {
    setMode(false);
    setAuthPopupState(true);
    setMessage({
      message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
    });
  }

  function authorize() {
    return auth
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (!data) {
          renderFailure();
          throw new Error("Uy, algo salió mal.");
        }
        if (data.token) {
          setLoggedIn(true);
        }
      })
      .then(resetForm)
      .then(() => history.push("/around"))
      .catch((err) => {
        console.log(err);
        renderFailure();
      });
  }

  //signup
  function register() {
    return auth
      .register(userEmail, userPassword)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          renderFailure();
          throw new Error("Uy, algo salió mal.");
        }
        renderSuccess();
      })
      .then(resetForm)
      .then(() => history.push("/login"))
      .catch((err) => {
        console.log(err);
        renderFailure();
      });
  }

  //logout
  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/login");
  }

  React.useEffect(() => {
    //token check
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/around");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  return (
    <div className="page">
      <Switch>
        <ProtectedRoute
          path="/around"
          loggedIn={loggedIn}
          email={userEmail}
          component={AroundUs}
          signOut={signOut}
          closePopup={closePopup}
          message={message}
          mode={mode}
          setUserEmail={setUserEmail}
        />
        <Route path="/login">
          <div className="loginContainer">
            <Login
              loggedIn={loggedIn}
              title="Iniciar Sesión"
              value="¿Aún no eres miembro? Regístrate aquí"
              link="/register"
              redirect="Regístrate"
              setLoggedIn={setLoggedIn}
              signOut={signOut}
              renderFailure={renderFailure}
              renderSuccess={renderSuccess}
              authorize={authorize}
              userEmail={userEmail}
              userPassword={userPassword}
              setUserEmail={setUserEmail}
              setUserPassword={setUserPassword}
            />
            <InfoTooltip
              popupState={authPopupState}
              closePopup={closePopup}
              message={message}
              mode={mode}
            />
          </div>
        </Route>
        <Route path="/register">
          <div className="registerContainer">
            <Register
              loggedIn={loggedIn}
              title="Regístrate"
              value="¿Ya eres miembro? Inicia sesión aquí"
              link="/login"
              redirect="Inicia sesión"
              setLoggedIn={setLoggedIn}
              signOut={signOut}
              renderFailure={renderFailure}
              renderSuccess={renderSuccess}
              register={register}
              userEmail={userEmail}
              userPassword={userPassword}
              setUserEmail={setUserEmail}
              setUserPassword={setUserPassword}
            />
            <InfoTooltip
              popupState={authPopupState}
              closePopup={closePopup}
              message={message}
              mode={mode}
            />
          </div>
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/around" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
