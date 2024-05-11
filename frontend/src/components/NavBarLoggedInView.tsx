import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as EntriesApi from "../network/entries_api";
import styleUtils from "../styles/utils.module.css";

/**
 * The NavBar component that renders when a user is logged in. It renders a welcome message and a logout button.
 *
 * @returns {JSX.Element} A React element that renders the NavBarLogginedInView component.
 */

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  // handles logout functionality when logged in
  async function logout() {
    try {
      await EntriesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-3">
        Welcome,{" "}
        <span style={{ color: "rgb(66, 178, 253)" }}>{user.username}</span>
      </Navbar.Text>
      <Button className={styleUtils.logOutButton} onClick={logout}>
        Log Out
      </Button>
    </>
  );
};

export default NavBarLoggedInView;
