import { FILTER_LANGUAGES, SELECT_LANGUAGES, SHOW_DATA, HIDE_LIST } from '../constants/languages';

export function filter(data) {
  return {
    type: FILTER_LANGUAGES,
    data,
  };
}

export function select(id) {
  return {
    type: SELECT_LANGUAGES,
    id,
  };
}

export function showData(data) {
  return {
    type: SHOW_DATA,
    data,
  };
}

export function hideList() {
  return {
    type: HIDE_LIST,
    data: null,
  };
}
