import { InferSchemaType, model, Schema } from "mongoose";

const entrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
}, { timestamps: true });

type Entry = InferSchemaType<typeof entrySchema>;

export default model<Entry>("Entry", entrySchema);