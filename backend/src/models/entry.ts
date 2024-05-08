import { InferSchemaType, model, Schema } from "mongoose";

/**
 * This schema interacts with the backend MongoDB database and defines the structure of an entry.
 * It is designed to hold an entry's relevant information, including userId that is necessary for authentication and an entry's text.
 * Timestamps are also included upon initial creation and potential future modificatin.
 */

const entrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
}, { timestamps: true });

type Entry = InferSchemaType<typeof entrySchema>;

export default model<Entry>("Entry", entrySchema);