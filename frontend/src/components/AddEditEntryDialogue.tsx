/*

this file is all about the New Entry button - how it looks and works

*/

import { Button, Form, Modal } from "react-bootstrap";
import { Entry } from "../models/entries";
import { useForm } from "react-hook-form";
import { EntryInput } from "../network/entries_api";
import * as EntriesApi from "../network/entries_api";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

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

  async function onSubmit(input: EntryInput) {
    try {
      let entryResponse: Entry;
      if (entryToEdit) {
        entryResponse = await EntriesApi.updateEntry(entryToEdit._id, input);
      } else {
        entryResponse = await EntriesApi.createEntry(input);
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
