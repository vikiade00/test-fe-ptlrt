import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Barang from "../pages/barang/Barang";

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Barang />} />
      </Route>
    </Routes>
  );
};

export default RoutesIndex;
