/**
 * This function asserts that a value is defined and not null or undefined.
 * If a value (val) is falsy, an error is thrown.
 * @param val - The value to be checked for a falsy value.
 */

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected 'val' to be defined, but recieved " + val);
    }
}