import createDebug from "debug";

export default (name: string) => createDebug("fin-api").extend(name);
