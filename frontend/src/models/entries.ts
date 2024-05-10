/**
 * This interface describes the structure of an Entry object. It ensures each entry will have the specified properties.
 * The properties of an Entry include a unique Id, text, a "created at" timestamp, and an "updated at" timestamp.
 */

export interface Entry {
    _id: string,
    text?: string,
    createdAt: string,
    updatedAt: string,
}