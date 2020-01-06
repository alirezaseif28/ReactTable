import React from "react";
import Movies from "./components/movies";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}
export default App;
