import React, { useState } from "react";

function Title({ text, ms }) {
  return (
    <title
      style={{
        margin: "auto",
        fontSize: 100,
        textAlign: "center",
        marginTop: "12vh",
      }}
    >
      {text.length ? text.split("").map((fragment) => <b>{fragment}</b>) : ""}{" "}
      <br />
      {ms.toFixed(2)} sec
    </title>
  );
}

function App() {
  const [counter, setCounter] = useState(0);
  React.useEffect(async () => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, [counter]);

  return (
    <text>
      <Title test="You won! 👏" ms={`${countr}`} />
    </text>
  );
}

export default App;
