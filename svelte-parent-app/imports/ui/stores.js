import { writable } from "svelte/store";

export const iFrameLoaded = writable(false);

export const count = writable(0);
