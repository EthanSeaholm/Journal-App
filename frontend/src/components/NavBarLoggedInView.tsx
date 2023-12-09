import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as EntriesApi from "../network/entries_api";
import styleUtils from "../styles/utils.module.css";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
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
      <Navbar.Text className="me-2">Welcome, {user.username}!</Navbar.Text>
      <Button className={styleUtils.logOutButton} onClick={logout}>
        Log Out
      </Button>
    </>
  );
};

export default NavBarLoggedInView;
