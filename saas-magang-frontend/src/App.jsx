import { useEffect } from "react";
import { api } from "./lib/api";

function App() {
  useEffect(() => {
    api.get("/health")
      .then(res => console.log("API OK:", res.data))
      .catch(err => console.error("API ERROR:", err));
  }, []);

  return <h1>React Connected</h1>;
}

export default App;