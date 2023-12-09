import { Button } from "react-bootstrap";
import styleUtils from "../styles/utils.module.css";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <div className={styleUtils.centeredStuff}>
      <Button className={styleUtils.signUpButton} onClick={onSignUpClicked}>
        Sign Up
      </Button>
      <Button className={styleUtils.logInButton} onClick={onLoginClicked}>
        Log in
      </Button>
    </div>
  );
};

export default NavBarLoggedOutView;
