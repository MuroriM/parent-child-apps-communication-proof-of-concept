import { writable } from "svelte/store";

export const iFrameLoaded = writable(false);
export const incomingMessageText = writable("");
export const count = writable(0);
