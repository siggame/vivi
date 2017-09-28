import { default as client, run } from "./app";

if (!module.parent) {
    run();
}

export { client };
