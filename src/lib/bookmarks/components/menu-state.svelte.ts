// Which filter menu is open, by id. Shared so opening one closes the rest.
export const menuState = $state<{ open: string | null }>({ open: null });
