import * as pb from 'post-buffer';

onmessage = (msg) => {
  const { data } = msg;
  const [result, err] = pb.bufferToJSON(data);
  if (!result) {
    console.error('Err in worker while building buffer:');
    console.error(err);
    return;
  }

  console.log('Echo worker heard:');
  console.log(result);
  const [success, err2] = pb.postBuffer(result, self);
  if (!success) {
    console.error('Err in worker while posting buffer:');
    console.error(err2);
  }
};
