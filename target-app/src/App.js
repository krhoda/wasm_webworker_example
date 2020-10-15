import React, { useEffect } from 'react';
import logo from './logo.svg';
import { makeEchoWorker, makeGreeterWorker } from 'workers';
import * as pb from 'post-buffer';
import './App.css';

const echoWorker = makeEchoWorker();
const greeterWorker = makeGreeterWorker();

function App() {
  useEffect(() => {
    echoWorker.onmessage = (msg) => {
      console.log(msg);
      let { data } = msg;
      let [result, errMsg] = pb.bufferToJSON(data);

      if (result) {
        console.log('UI thread heard:');
        console.log(result);
      } else {
        console.error('Error in UI unpacking buffer:');
        console.error(errMsg);
      }
    };

    let [success, errMsg2] = pb.postBuffer({ hello: 'world' }, echoWorker);
    if (!success) {
      console.error('Error in UI posting buffer:');
      console.error(errMsg2);
    }

    greeterWorker.onmessage = (msg) => {
      let { data } = msg;
      let [result, errMsg] = pb.bufferToJSON(data);
      if (result) {
        console.log('UI thread heard:');
        console.log(result);
      } else {
        console.error('Error in UI unpacking buffer:');
        console.error(errMsg);
      }
    };

    let [success2, errMsg3] = pb.postBuffer({ action: 'greet' }, greeterWorker);
    if (!success2) {
      console.error('Error in UI posting buffer:');
      console.error(errMsg3);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
