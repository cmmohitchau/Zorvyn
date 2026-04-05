
import {BrowserRouter , Routes , Route } from "react-router-dom";
import { Dashboard } from "./Page/Dashboard";
import { Analytics } from "./Page/Analytics";
import { Card } from "./Page/Card";
import { ManageTransaction } from "./Page/ManageTransaction";
import { Transactions } from "./Page/Transactions";
import { Layout } from "./Layout";

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/manage" element={<ManageTransaction />} />
          <Route path="/card" element={<Card />} />
          <Route path="/transaction" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>


  )
}

export default App

