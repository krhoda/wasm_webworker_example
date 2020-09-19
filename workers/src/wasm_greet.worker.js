import * as pb from "post-buffer";
import * as wasmRaw from "../../wasm-functions/pkg/wasm_functions_bg.wasm";

let wasmLib = new WebAssembly.Instance(wasmRaw).exports;
onmessage = (msg) => {
    let {data} = msg;
    let [result, err] = pb.bufferToJSON(data);
    if (!result) {
        console.error("Err in greeting worker while building buffer:")
        console.error(err);
        return
    }

    if (result.action !== 'greet') {
        console.error("Cannot do anything but greet");
        return
    }

    console.log("greeterworker worker heard:");
    console.log(result);

    let num = wasmLib.greet();

    let [success, err2] = pb.postBuffer({ greeting: num }, self);
    if (!success) {
        console.error("Err in worker while posting buffer:")
        console.error(err2);
    }
}