import { Button } from "react-bootstrap";
import styleUtils from "../styles/utils.module.css";

/**
 * The NavBar component that renders when a user is logged out. It renders the sign-up and login buttons.
 *
 * @returns {JSX.Element} A React element that renders the NavBarLoggedOutView component.
 */

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
