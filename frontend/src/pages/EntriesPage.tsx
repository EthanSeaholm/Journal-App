import { Container } from "react-bootstrap";
import EntriesPageLoggedInView from "../components/EntriesPageLoggedInView";
import EntriesPageLoggedOutView from "../components/EntriesPageLoggedOutView";
import styles from "../styles/EntriesPage.module.css";
import { User } from "../models/user";

interface EntriesPageProps {
  loggedInUser: User | null;
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
