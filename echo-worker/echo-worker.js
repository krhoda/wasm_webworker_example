const work = require('webworkify');

export function makeEchoWorker() {
    return work(require('./echo.worker.js'));
}