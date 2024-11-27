import React, { useContext, useState } from "react";
import ModalInput from "./ModalInput";
import ModalEdit from "./ModalEdit";
import { BarangContext } from "../../context/BarangContext";
import dayjs from "dayjs";

const TableBarang = () => {
  const {
    barangList,
    currentPage,
    totalPages,
    isLoading,
    handlePageChange,
    deleteBarang,
  } = useContext(BarangContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [modalEditBarang, setModalEditBarang] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleOpenEditModal = (barang) => {
    setModalEditBarang(barang);
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setModalEditBarang(null);
    setIsEditModalVisible(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      deleteBarang(id);
    }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMMM D, YYYY");
  };

  const filteredBarangList = (barangList || []).filter((barang) =>
    barang.nama_barang?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between mt-5 mb-4">
        <label className="input input-sm input-bordered flex items-center">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn-sm btn btn-primary" onClick={handleOpenModal}>
          Tambah
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Jumlah Barang</th>
              <th>Harga Total</th>
              <th>Tanggal Masuk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredBarangList.length > 0 ? (
              filteredBarangList.map((barang, index) => (
                <tr key={barang._id}>
                  <th>{(currentPage - 1) * 5 + index + 1}</th>
                  <td>{barang.nama_barang}</td>
                  <td>{barang.kategori_barang}</td>
                  <td>{barang.jumlah_barang}</td>
                  <td>Rp {barang.jumlah_barang * barang.harga_per_unit}</td>
                  <td>{formatDate(barang.tanggal_masuk)}</td>
                  <td className="gap-1 flex">
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleOpenEditModal(barang)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(barang._id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Tidak ada data yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="btn-group flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      <ModalInput isVisible={isModalVisible} onClose={handleCloseModal} />
      <ModalEdit
        isVisible={isEditModalVisible}
        onClose={handleCloseEditModal}
        barang={modalEditBarang}
      />
    </div>
  );
};

export default TableBarang;
