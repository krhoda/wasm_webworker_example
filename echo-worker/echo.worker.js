const pb = require('post-buffer');

module.exports = function(scope) {
    scope.onmessage = (msg) => {
        let {data} = msg;
        let result = pb.bufferToJSON(data);
        if (!result) {
            console.log('SEE ABOVE');
            return
        }

        console.log("Echo worker heard:");
        console.log(result);
        pb.postBuffer(result, scope);
    }
}