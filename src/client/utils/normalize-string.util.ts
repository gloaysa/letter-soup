/**
 * It returns the passed string without any combining diacritical marks.
 * @example normalizeString(árbol) // arbol
 * @param str
 */
export const normalizeString = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
