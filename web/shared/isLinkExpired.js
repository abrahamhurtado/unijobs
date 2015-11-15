export default (expiration) => {
  if (Date.now() > expiration) {
    return true;
  } else {
    return false;
  }
};
