import * as pb from 'post-buffer';

const ctx: Worker = self as any;

const handler = (msg) => {
    let {data} = msg;
    let [result, err] = pb.bufferToJSON(data);
    if (!result) {
        console.error("Err in worker while building buffer:")
        console.error(err);
        return
    }

    console.log("Echo worker heard:");
    console.log(result);
    let [success, err2] = pb.postBuffer(result, ctx);
    if (!success) {
        console.error("Err in worker while posting buffer:")
        console.error(err2);
    }
}

ctx.addEventListener('message', handler);