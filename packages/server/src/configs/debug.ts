import createDebug from "debug";

export default (name: string) => createDebug("balance-api").extend(name);
