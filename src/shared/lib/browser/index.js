import { initLSItem } from "./storage";

export { useLocalStorage, initLSItem } from "./storage";

export const [getToken, setToken] = initLSItem("token", null);
