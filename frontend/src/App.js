import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { ApplicationViews}  from "./ApplicationViews";
import { UserProvider } from "./Providers/UserProvider";

function App() {
  return (
      <Router>
        <UserProvider>
          <ApplicationViews />
        </UserProvider>
      </Router>
  );
}

export default App;