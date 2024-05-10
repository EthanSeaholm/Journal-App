import { Container } from "react-bootstrap";
import EntriesPageLoggedInView from "../components/EntriesPageLoggedInView";
import EntriesPageLoggedOutView from "../components/EntriesPageLoggedOutView";
import styles from "../styles/EntriesPage.module.css";
import { User } from "../models/user";

/**
 * This component renders the Entries page based on whether or not a user is logged in.
 * It receives the "loggedInUser" prop to check if a user is logged in.
 * If a user is logged in, the EntriesPageLoggedInView component will be rendered.
 * If not, the EntriesPageLoggedOutView wil be rendered.
 *
 * @returns {JSX.Element} A React element that renders the entries page.
 */

interface EntriesPageProps {
  loggedInUser: User | null; // describes the type of the "loggedInUser" prop
}

const EntriesPage = ({ loggedInUser }: EntriesPageProps) => {
  return (
    <Container className={styles.entriesPage}>
      <>
        {loggedInUser ? (
          <EntriesPageLoggedInView />
        ) : (
          <EntriesPageLoggedOutView />
        )}
      </>
    </Container>
  );
};

export default EntriesPage;
