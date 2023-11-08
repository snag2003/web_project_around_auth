import logo from "../images/logo.svg";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  function handleClick() {
    if (props.redirect === "Regístrate") {
      history.push("/register");
    }
    if (props.redirect === "Inicia sesión") {
      history.push("/login");
    }
  }

  return (
    <header className="header">
      <ul className="header__container">
        <img className="header__logo" src={logo} alt="Logo de Around The US" />
        <div className="header__login">
          <li className="header__item">{props.email}</li>
          <li className="header__item">
            <button
              className="header__button header__button-loggedin"
              onClick={
                props.redirect === "Cerrar Sesión" ? props.signOut : handleClick
              }
            >
              {props.redirect}
            </button>
          </li>
        </div>
      </ul>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
// onClick={props.redirect === 'Log out' ? console.log(props.signOut) : console.log(handleClick)}
