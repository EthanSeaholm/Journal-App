/*

interfaces define the structure of an (Entry) object by specifying names and types of its properties - makes it so that every entry will have an id, text inside of it, and a
'created at' and 'updated at' timestamp

*/

export interface Entry {
    _id: string,
    text?: string,
    createdAt: string,
    updatedAt: string,
}