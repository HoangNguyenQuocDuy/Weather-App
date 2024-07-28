import { SEARCH_CITY, INPUT_VALUE } from "./constants";

export const searchList = payload => ({
    type: SEARCH_CITY,
    payload
})

export const inputValue = payload => ({
    type: INPUT_VALUE,
    payload
})