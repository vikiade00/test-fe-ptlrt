import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BarangContext = createContext();

export const BarangProvider = ({ children }) => {
  const [barangList, setBarangList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 5;
  //   const API_URL = import.meta.env.VITE_API_URL;

  const fetchBarang = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://test-be-ptlrt.vercel.app/api/barang?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      setBarangList(response.data.data);
      setCurrentPage(response.data.pagination.currentPage || 1);
      setTotalPages(response.data.pagination.totalPages || 1);
      console.log(response);
    } catch (error) {
      console.error("Error fetching barang:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editBarang = async (id, updatedBarang) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://test-be-ptlrt.vercel.app/api/barang/${id}`,
        updatedBarang
      );
      alert("Barang berhasil diperbarui!");
      fetchBarang();
      console.log("Response edit:", response);
    } catch (error) {
      console.error("Error editing barang:", error);
      alert("Gagal memperbarui barang.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBarang(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createBarang = async (newBarang) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://test-be-ptlrt.vercel.app/api/barang`,
        newBarang
      );
      alert("Barang berhasil ditambahkan!");
      fetchBarang();
      console.log("Response create:", response);
    } catch (error) {
      console.error("Error creating barang:", error);
      alert("Gagal menambahkan barang.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBarang = async (id) => {
    try {
      await axios.delete(`https://test-be-ptlrt.vercel.app/api/barang/${id}`);
      setBarangList(barangList.filter((barang) => barang._id !== id));
    } catch (error) {
      console.error("Gagal menghapus barang", error);
    }
  };

  return (
    <BarangContext.Provider
      value={{
        barangList,
        currentPage,
        totalPages,
        isLoading,
        handlePageChange,
        createBarang,
        editBarang,
        deleteBarang,
      }}
    >
      {children}
    </BarangContext.Provider>
  );
};
