import React, { useState, useContext, useEffect } from "react";
import { BarangContext } from "../../context/BarangContext";
import dayjs from "dayjs";

const ModalEdit = ({ isVisible, onClose, barang }) => {
  const { editBarang } = useContext(BarangContext);

  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori_barang: "",
    jumlah_barang: "",
    harga_per_unit: "",
    tanggal_masuk: "",
  });

  useEffect(() => {
    if (barang) {
      setFormData({
        nama_barang: barang.nama_barang || "",
        kategori_barang: barang.kategori_barang || "",
        jumlah_barang: barang.jumlah_barang || "",
        harga_per_unit: barang.harga_per_unit || "",
        tanggal_masuk: dayjs(barang.tanggal_masuk).format("YYYY-MM-DD") || "",
      });
    }
  }, [barang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nama_barang ||
      !formData.kategori_barang ||
      !formData.jumlah_barang ||
      !formData.harga_per_unit ||
      !formData.tanggal_masuk
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    await editBarang(barang._id, formData);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-bold text-lg mb-2">Edit Barang</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text">Nama Barang</span>
          </label>
          <input
            type="text"
            name="nama_barang"
            value={formData.nama_barang}
            onChange={handleChange}
            placeholder="Nama Barang"
            className="input input-bordered w-full input-sm"
            required
          />

          <label className="label">
            <span className="label-text">Kategori Barang</span>
          </label>
          <select
            name="kategori_barang"
            value={formData.kategori_barang}
            onChange={handleChange}
            className="input input-bordered w-full input-sm"
            required
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            <option value="Elektronik">Elektronik</option>
            <option value="Pakaian">Pakaian</option>
            <option value="Makanan">Makanan</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <label className="label">
            <span className="label-text">Jumlah Barang</span>
          </label>
          <input
            type="number"
            name="jumlah_barang"
            value={formData.jumlah_barang}
            onChange={handleChange}
            placeholder="Jumlah Barang"
            className="input input-bordered w-full input-sm"
            min="1"
            required
          />

          <label className="label">
            <span className="label-text">Harga Per Unit</span>
          </label>
          <input
            type="number"
            name="harga_per_unit"
            value={formData.harga_per_unit}
            onChange={handleChange}
            placeholder="Harga per Unit"
            className="input input-bordered w-full input-sm"
            min="100"
            required
          />

          <label className="label">
            <span className="label-text">Tanggal Masuk</span>
          </label>
          <input
            type="date"
            name="tanggal_masuk"
            value={formData.tanggal_masuk}
            onChange={handleChange}
            className="input input-bordered w-full input-sm"
            required
          />

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={onClose}
            >
              Tutup
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
