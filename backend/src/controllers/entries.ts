import { RequestHandler } from "express";
import EntryModel from "../models/entry";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

/**
 * Handles the CRUD (create, read, update, and delete) operations for entries.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next function to call the middleware.
 */

// The getEntries request handler fetches all of a user's entries.
export const getEntries: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);       // asserts that a user is logged in and a userId is present

        const entries = await EntryModel.find({ userId: authenticatedUserId }).exec();      // fetches the user's respective entries after authentication
        res.status(200).json(entries);      // if successful and entries are found, a 200 OK response is sent back
    } catch (error) {
        next(error);        // if authentication is unsuccessful or no entries are found, an error is forwarded to the error-handling middleware
    }
};

// The getEntry request handler fetches a user's specific entry.
export const getEntry: RequestHandler = async (req, res, next) => {
    const entryId = req.params.entryId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(entryId)) {
            throw createHttpError(400, "Invalid entry Id");     // if the entryId is invalid, a 400 Bad Request error is thrown
        }

        const entry = await EntryModel.findById(entryId).exec();        // fetches the respective entry

        if (!entry) {
            throw createHttpError(404, "Entry not found");      // if the entry does not exist, a 404 Not Found error is thrown
        }

        if (!entry.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this entry");     // if user authentication is unsuccessful, a 401 Unathorized error is thrown
        }

        res.status(200).json(entry);        // if authentication is successful and the entry exists, a 200 OK response is sent back
    } catch (error) {
        next(error);
    }
};

interface CreateEntryBody {
    text?: string,
}

// The createEntry request handler handles the creation of a new entry.
export const createEntry: RequestHandler<unknown, unknown, CreateEntryBody, unknown> = async (req, res, next) => {
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!text) {
            throw createHttpError(400, "Entry must have text");     // if no text is entered, a 400 Bad Request error is thrown
        }

        const newEntry = await EntryModel.create({      // if the text input is valid, attempt to create a new entry in the database
            userId: authenticatedUserId,
            text: text,
        });

        res.status(201).json(newEntry);     // if the entry is successfully created, a 201 Created response is sent back
    } catch (error) {
        next(error);
    }
};

interface UpdateNoteParams {
    entryId: string,
}

interface UpdateEntryBody {
    text?: string,
}

// The updateEntry request handler handles the modification of an existing entry.
export const updateEntry: RequestHandler<UpdateNoteParams, unknown, UpdateEntryBody, unknown> = async (req, res, next) => {
    const entryId = req.params.entryId;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(entryId)) {
            throw createHttpError(400, "Invalid entry Id");     // if the entryId is an invalid MongoDB object, a 400 Bad Request error is thrown
        }

        if (!newText) {
            throw createHttpError(400, "Entry must have text");     // if no text is entered, a 400 Bad Request error is thrown
        }

        const entry = await EntryModel.findById(entryId).exec();

        if (!entry) {
            throw createHttpError(404, "Entry not found");
        }

        if (!entry.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this entry");
        }

        entry.text = newText;       // updates the entry's current text with the modified text

        const updatedEntry = await entry.save();        // the modified entry and its updated text are saved to the database

        res.status(200).json(updatedEntry);     // if the entry is successfully modified, a 200 OK response is sent back
    } catch (error) {
        next(error);
    }
};

// The deleteEntry request handler handles the deletion of an existing entry.
export const deleteEntry: RequestHandler = async (req, res, next) => {
    const entryId = req.params.entryId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(entryId)) {
            throw createHttpError(400, "Invalid entry Id");
        }

        const entry = await EntryModel.findById(entryId).exec();

        if (!entry) {
            throw createHttpError(404, "Entry not found");
        }

        if (!entry.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this entry");
        }

        await entry.deleteOne();        // deletes the specified entry from the database

        res.sendStatus(204);        // if deletion is successful, a 204 No Content response is sent back
    } catch (error) {
        next(error);
    }
};