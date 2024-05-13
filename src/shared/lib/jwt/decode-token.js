export const decodeToken = (token) => {
  const tokenParts = token.split(".");
  const encodedPayload = tokenParts[1];
  const decodedPayload = atob(encodedPayload);
  const payload = JSON.parse(decodedPayload);
  return payload;
};
