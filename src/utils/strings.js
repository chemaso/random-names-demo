import get from "lodash/get";

export const generateShowName = (item) => {
  const firstName = get(item, "name.first", "");
  const lastName = get(item, "name.last", "");
  return `${firstName} ${lastName}`;
};

export const generateShowLocation = (item) => {
  const city = get(item, "location.city", "");
  const state = get(item, "location.state", "");
  return `${city}, ${state}`;
};
