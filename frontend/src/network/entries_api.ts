import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Entry } from "../models/entries";
import { User } from "../models/user";

/**
 * API calls that communicate with the backend MongoDB database are handled here.
 * These API calls handle things like:
 * - Data fetching.
 * - User sign-up, login, and logout.
 * - Creating, reading, updating, and deleting entries.
 */

/**
 * An asynchronous function that handles HTTP requests.
 * 
 * @param input - What is being fetched, like a URL string or a Request object.
 * @param init - An object containing any custom settings to be applied to the request
 * @returns A Promise that resolves to the Response object if the request is successful.
 *          Throws an UnauthorizedError for 401 status code, ConflictError for 409 status code,
 *          or a generic Error for other status codes.
 */

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage)
        }
    }
}

/**
 * An asynchronous function that fetches a user's information.
 * 
 * @returns A Promise that resolves to the user object containing a user's information.
 */

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("https://api.prog-ress.live/users", { method: "GET", credentials: "include", });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

/**
 * An asynchronous function that handles new user sign-up.
 * 
 * @param credentials - Contains the parameters necessary to successfully create a new user.
 * @returns A Promise that resolves to the newly created user.
 */

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("https://api.prog-ress.live/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

/**
 * An asynchronous function that handles exisiting user log-in.
 * 
 * @param credentials - Contains the parameters necessary to successfully log in.
 * @returns A Promise that resolves to the user object containing the user's information.
 */

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("https://api.prog-ress.live/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });
    return response.json();
}

/**
 * An asynchronous function that handles logging a user out.
 */

export async function logout() {
    await fetchData("https://api.prog-ress.live/users/logout", { method: "POST", credentials: "include", });
}

/**
 * An asynchronous function that fetches a user's entries.
 * 
 * @returns A Promise that resolves to the entry object containing the user's entries.
 */

export async function fetchEntries(): Promise<Entry[]> {
    const response = await fetchData("https://api.prog-ress.live/entries", { method: "GET", credentials: "include", });
    return response.json();
}

export interface EntryInput {
    text?: string,
}

/**
 * An asynchronous function that handles the creation of a new entry.
 * 
 * @param entry - The text within the entry.
 * @returns A Promise that resolves to the newly created entry.
 */

export async function createEntry(entry: EntryInput): Promise<Entry> {
    const response = await fetchData("https://api.prog-ress.live/entries",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry), credentials: "include",
        });
    return response.json();
}

/**
 * An asynchronous function that handles the deletion of an existing entry.
 * 
 * @param entryId - The Id of the entry to be deleted.
 */

export async function deleteEntry(entryId: string) {
    await fetchData("https://api.prog-ress.live/entries/" + entryId,
        {
            method: "DELETE",
            credentials: "include",
        });
}

/**
 * An asynchronous function that handles the modification of an existing entry.
 * 
 * @param entryId - The Id of the entry to be updated.
 * @param entry - The updated text within the entry.
 * @returns A Promise that resolves to the updated entry object.
 */

export async function updateEntry(entryId: string, entry: EntryInput): Promise<Entry> {
    const response = await fetchData("https://api.prog-ress.live/entries/" + entryId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
            credentials: "include",
        });
    return response.json()
}