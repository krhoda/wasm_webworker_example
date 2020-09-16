import React, {useEffect} from 'react';
import logo from './logo.svg';
import {makeEchoWorker} from "echo-worker";
import * as pb from "post-buffer";
import './App.css';

const echoWorker = makeEchoWorker();

function App() {
  useEffect(() => {
    echoWorker.onmessage = (msg) => {
      console.log(msg);
      let {data} = msg;
      let result = pb.bufferToJSON(data);

      if (result) {
        console.log("UI thread heard:")
        console.log(result);
      }
    };

    pb.postBuffer({hello: "world"}, echoWorker);
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
