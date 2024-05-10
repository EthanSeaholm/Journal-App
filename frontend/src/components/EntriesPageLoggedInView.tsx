import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Entry as EntryModel } from "../models/entries";
import * as EntriesApi from "../network/entries_api";
import styleUtils from "../styles/utils.module.css";
import AddEditEntryDialogue from "./AddEditEntryDialogue";
import Entry from "./Entries";
import styles from "../styles/EntriesPage.module.css";

/**
 * Describes and renders the layout of the Entries page when a user is logged in.
 * Renders a user's existing entries.
 * Contains a button to create new entries.
 * While entries are being fetched, a loading placeholder is rendered.
 * If a user has not created any entries, a unique message is rendered.
 *
 * @returns {JSX.Element} A React element implementing the layout of the Entries page.
 */

const EntriesPageLoggedInView = () => {
  const [entries, setEntries] = useState<EntryModel[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(true);
  const [showEntriesLoadingError, setShowEntriesLoadingError] = useState(false);

  const [showAddEntryDialogue, setShowAddEntryDialogue] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState<EntryModel | null>(null);

  /**
   * This useEffect function fetches all of a user's entries and renders them onto the Entries page upon mount.
   * It features state that tracks the fetching process, allowing for a future loading placeholder to be implemented.
   * If an error occurs, it will be thrown and logged to the console.
   */

  useEffect(() => {
    async function loadEntries() {
      try {
        setShowEntriesLoadingError(false);
        setEntriesLoading(true);
        const entries = await EntriesApi.fetchEntries();
        setEntries(entries);
      } catch (error) {
        console.error(error);
        setShowEntriesLoadingError(true);
      } finally {
        setEntriesLoading(false);
      }
    }
    loadEntries();
  }, []);

  /**
   * This function handles the deletion of entries.
   *
   * @param entry - The entry to be passed in for deletion.
   */

  async function deleteEntry(entry: EntryModel) {
    try {
      await EntriesApi.deleteEntry(entry._id);
      setEntries(
        entries.filter((existingEntry) => existingEntry._id !== entry._id)
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  /**
   * Describes the layout of the Entries page.
   * Maps and renders each entry.
   */

  const entriesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.entriesGrid}`}>
      {entries.map((entry) => (
        <Col key={entry._id}>
          <Entry
            entry={entry}
            className={styles.entry}
            onDeleteEntryClicked={deleteEntry}
            onEntryClicked={setEntryToEdit}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddEntryDialogue(true)}
      >
        <FaPlus />
        New Entry
      </Button>
      {/* while entries are being fetched, the loading placeholder is rendered */}
      {entriesLoading && <Spinner animation="border" variant="primary" />}
      {showEntriesLoadingError && (
        <p>Something went wrong, please refresh the page!</p>
      )}
      {!entriesLoading && !showEntriesLoadingError && (
        <>
          {entries.length > 0 ? (
            entriesGrid
          ) : (
            <p>You have not created any entries!</p> // renders if the user has not created any entries
          )}
        </>
      )}
      {showAddEntryDialogue && (
        <AddEditEntryDialogue
          onDismiss={() => setShowAddEntryDialogue(false)}
          onEntrySaved={(newEntry) => {
            setEntries([...entries, newEntry]);
            setShowAddEntryDialogue(false);
          }}
        />
      )}
      {entryToEdit && (
        <AddEditEntryDialogue
          entryToEdit={entryToEdit}
          onDismiss={() => setEntryToEdit(null)}
          onEntrySaved={(updatedEntry) => {
            setEntries(
              entries.map((existingEntry) =>
                existingEntry._id === updatedEntry._id
                  ? updatedEntry
                  : existingEntry
              )
            );
            setEntryToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default EntriesPageLoggedInView;
