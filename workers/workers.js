import Echo from "./src/echo.worker.js";

function makeEchoWorker() {
    return new Echo();
}

export {makeEchoWorker};