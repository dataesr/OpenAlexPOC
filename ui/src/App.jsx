import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Network from "./components/network";
import Layout from "./layout";
import load from "./load";
import HomePage from "./pages/home";
import AffiliationsExplorerPage from "./pages/affiliations";
import SignaturesExplorerPage from "./pages/signatures";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="explore/affiliations" element={<AffiliationsExplorerPage />} />
          <Route path="explore/signatures" element={<SignaturesExplorerPage />} />
          <Route path="draft" element={<Draft />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Draft() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await load(
        "publication_year:2016-,raw_affiliation_string.search:beta cnrs"
      );
      setData(data);
    };
    getData();
  }, []);

  return (
    <div>
      <Network />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
