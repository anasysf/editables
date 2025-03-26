/**
 * Validates whether the query passed belongs to a <table> element.
 *
 * @throws {ReferenceError}
 * Thrown if no element was found with the query selector provided.
 *
 * @throws {TypeError}
 * Thrown if the element is found but it's not a table element.
 */
export function validateTableQuerySelector(tableQuerySelector: string): void {
    const tableEl = document.querySelector(tableQuerySelector);

    if (!tableEl)
        throw new ReferenceError(`Couldn't find ${tableQuerySelector}`);
    else if (!(tableEl instanceof HTMLTableElement))
        throw new TypeError(`Expected '${tableQuerySelector}' to belong to a <table> element, instead received: <${tableEl.tagName.toLowerCase()}>`);
}
