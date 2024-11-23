import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import List from './Pages/List.js'
import Detail from "./Pages/Detail.js";
import Update from "./Pages/Update.js";
import Create from "./Pages/Create.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='' element={<List />} />
        <Route exact path='/' element={<List />} />
        <Route path='/List' element={<List />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Detail' element={<Detail />} />
        <Route path='/Update' element={<Update />} />
        <Route path="/Detail/:userId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}