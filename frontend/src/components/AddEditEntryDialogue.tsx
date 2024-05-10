import { Button, Form, Modal } from "react-bootstrap";
import { Entry } from "../models/entries";
import { useForm } from "react-hook-form";
import { EntryInput } from "../network/entries_api";
import * as EntriesApi from "../network/entries_api";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

/**
 * When attempting to create a new entry or update an existing entry, an entry modal is rendered for the user to enter input into an entry.
 * Contains an onSubmit functionality to save the new or updated entry to the database.
 *
 * @returns {JSX.Element} A React element that renders the Entry modal when creating or editing an entry.
 */

interface AddEditEntryButtonProps {
  entryToEdit?: Entry;
  onDismiss: () => void;
  onEntrySaved: (entry: Entry) => void;
}

const AddEditEntryDialogue = ({
  entryToEdit,
  onDismiss,
  onEntrySaved,
}: AddEditEntryButtonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntryInput>({
    defaultValues: {
      text: entryToEdit?.text || "",
    },
  });

  /**
   * This function saves a new or updated entry to the database.
   * If unsuccessful, an error will be thrown.
   * @param input - The new or updated entry's input.
   */

  async function onSubmit(input: EntryInput) {
    try {
      let entryResponse: Entry;
      if (entryToEdit) {
        entryResponse = await EntriesApi.updateEntry(entryToEdit._id, input); // if updating an existing entry
      } else {
        entryResponse = await EntriesApi.createEntry(input); // if creating a new entry
      }
      onEntrySaved(entryResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {entryToEdit ? "More to add?" : "What's new?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditEntryForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="text"
            label="Let's hear it!"
            type="text"
            as="textarea"
            rows={5}
            placeholder="..."
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.text}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={styleUtils.saveButton}
          type="submit"
          form="addEditEntryForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditEntryDialogue;
