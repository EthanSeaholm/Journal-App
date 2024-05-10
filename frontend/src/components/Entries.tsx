import styles from "../styles/Entry.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Entry as EntryModel } from "../models/entries";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

/**
 * This file is responsible for rendering entry cards upon successfully creating or updating an entry.
 * Entry cards are visible on the Entries page.
 * Each entry cards contains:
 * - The text or input.
 * - A timestamp specifying the date and time of its initial creation or, if updated, a new timestamp specifying the date and time of the update.
 * A clickable trashcan icon allowing for deletion of the respective entry when clicked is also rendered.
 *
 * @returns {JSX.Element} A React element rendering an entry card on the Entries page after it is saved. Each entry card contains text, a timestamp, and an icon representing deletion.
 */

interface EntryProps {
  entry: EntryModel;
  onDeleteEntryClicked: (entry: EntryModel) => void;
  onEntryClicked: (entry: EntryModel) => void;
  className?: string;
}

const Entry = ({
  entry,
  onDeleteEntryClicked,
  onEntryClicked,
  className,
}: EntryProps) => {
  const { text, createdAt, updatedAt } = entry;

  // if an entry is updated, a new updated timestamp will replace its intial creation timestamp
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.entryCard} ${className}`}
      onClick={() => onEntryClicked(entry)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className={styleUtils.flexCenter}>
        {createdUpdatedText}
        <MdDelete
          className="text-muted ms-auto"
          onClick={(e) => {
            onDeleteEntryClicked(entry); // deletes the respective entry
            e.stopPropagation();
          }}
        />
      </Card.Footer>
    </Card>
  );
};

export default Entry;
