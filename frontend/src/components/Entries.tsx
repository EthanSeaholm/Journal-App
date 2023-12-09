/*

this whole file is essentially setting up how the entry cards themselves look and work. all of the code below has to do with what goes on inside of the card:
text, timestamp, delete icon, etc

*/

import styles from "../styles/Entry.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Entry as EntryModel } from "../models/entries"; // based on the Entry interface from entries.ts, just being called EntryModel instead of Entry like it is in entries.ts
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface EntryProps {
  entry: EntryModel; // this is an actual entry [object] adhering to the Entry interface in entries.ts being passed in as a property to EntryProps
  onDeleteEntryClicked: (entry: EntryModel) => void; // a function that accepts an actual entry adhering to the Entry interface being passed in to get deleted
  onEntryClicked: (entry: EntryModel) => void;
  className?: string; // optional?
}

const Entry = ({
  entry,
  onDeleteEntryClicked,
  onEntryClicked,
  className,
}: EntryProps) => {
  // the Entry component recieves props from the EntryProps interface to extract specific props from the entry object that was passed in to EntryProps
  const {
    // object destructuring -> this snippet is extracting specific properties of the entry object that was passed in to the above interface and component: as defined below (text, createdAt, updatedAt)
    text, // a propety we want
    createdAt, // a propety we want
    updatedAt, // a propety we want
  } = entry; // = entry is the object/component we're extracting the properties from

  /*
    
    each property that gets extracted gets assigned to variables of the same name, which are used below: createdAt and updatedAt in the if statement, {text} in the return statement
    
    */

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
        <Card.Text className={styles.cardText}>
          {text}{" "}
          {/* an extracted property we recieved from destructuring the entry object above, can be used freely */}
        </Card.Text>
      </Card.Body>
      <Card.Footer className={styleUtils.flexCenter}>
        {createdUpdatedText}
        <MdDelete
          className="text-muted ms-auto"
          onClick={(e) => {
            onDeleteEntryClicked(entry);
            e.stopPropagation();
          }}
        />
      </Card.Footer>
    </Card>
  );
};

export default Entry;
