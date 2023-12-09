import { RequestHandler } from "express";
import EntryModel from "../models/entry";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";


export const getEntries: RequestHandler = async (req, res, next) => {
    const autheticatedUserId = req.session.userId;


    try {
        assertIsDefined(autheticatedUserId);

        const entries = await EntryModel.find({ userId: autheticatedUserId }).exec();
        res.status(200).json(entries);
    } catch (error) {
        next(error);
    }
};


export const getEntry: RequestHandler = async (req, res, next) => {
    const entryId = req.params.entryId;
    const autheticatedUserId = req.session.userId;

    try {
        assertIsDefined(autheticatedUserId);

        if (!mongoose.isValidObjectId(entryId)) {
            throw createHttpError(400, "Invalid entry Id")
        }

        const entry = await EntryModel.findById(entryId).exec();

        if (!entry) {
            throw createHttpError(404, "Entry not found");
        }

        if (!entry.userId.equals(autheticatedUserId)) {
            throw createHttpError(401, "You cannot access this entry.");
        }

        res.status(200).json(entry);
    } catch (error) {
        next(error);
    }
};


interface CreateEntryBody {
    text?: string,
}

export const createEntry: RequestHandler<unknown, unknown, CreateEntryBody, unknown> = async (req, res, next) => {
    const text = req.body.text;
    const autheticatedUserId = req.session.userId;

    try {
        assertIsDefined(autheticatedUserId);

        if (!text) {
            throw createHttpError(400, "Entry must have text");
        }

        const newEntry = await EntryModel.create({
            userId: autheticatedUserId,
            text: text,
        });

        res.status(201).json(newEntry);
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

export const updateEntry: RequestHandler<UpdateNoteParams, unknown, UpdateEntryBody, unknown> = async (req, res, next) => {
    const entryId = req.params.entryId;
    const newText = req.body.text;
    const autheticatedUserId = req.session.userId;

    try {
        assertIsDefined(autheticatedUserId);

        if (!mongoose.isValidObjectId(entryId)) {
            throw createHttpError(400, "Invalid entry Id")
        }

        if (!newText) {
            throw createHttpError(400, "Entry must have text");
        }

        const entry = await EntryModel.findById(entryId).exec();

        if (!entry) {
            throw createHttpError(404, "Entry not found");
        }

        if (!entry.userId.equals(autheticatedUserId)) {
            throw createHttpError(401, "You cannot access this entry.");
        }

        entry.text = newText;

        const updatedEntry = await entry.save();

        res.status(200).json(updatedEntry);
    } catch (error) {
        next(error);
    }
}

export const deleteEntry: RequestHandler = async (req, res, next) => {
    const entryId = req.params.entryId;
    const autheticatedUserId = req.session.userId;

    try {
        assertIsDefined(autheticatedUserId);

        if (!mongoose.isValidObjectId(entryId)) {
            throw createHttpError(400, "Invalid entry Id")
        }

        const entry = await EntryModel.findById(entryId).exec();

        if (!entry) {
            throw createHttpError(404, "Entry not found");
        }

        if (!entry.userId.equals(autheticatedUserId)) {
            throw createHttpError(401, "You cannot access this entry.");
        }

        await entry.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};