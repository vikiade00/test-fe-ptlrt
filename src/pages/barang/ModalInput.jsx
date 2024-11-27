import React, { useState, useContext } from "react";
import { BarangContext } from "../../context/BarangContext";

const ModalInput = ({ isVisible, onClose }) => {
  const { createBarang } = useContext(BarangContext);

  const [formData, setFormData] = useState({
    nama_barang: "",
    kategori_barang: "",
    jumlah_barang: "",
    harga_per_unit: "",
    tanggal_masuk: "",
  });

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
    if (formData.jumlah_barang < 1) {
      alert("Jumlah barang minimal 1.");
      return;
    }
    if (formData.harga_per_unit < 100) {
      alert("Harga per unit minimal Rp100.");
      return;
    }

    await createBarang(formData);
    setFormData({
      nama_barang: "",
      kategori_barang: "",
      jumlah_barang: "",
      harga_per_unit: "",
      tanggal_masuk: "",
    });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-bold text-lg mb-2">Tambah Barang</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Nama Barang</span>
            </label>
            <input
              type="text"
              name="nama_barang"
              value={formData.nama_barang}
              onChange={handleChange}
              placeholder="Masukkan nama barang"
              className="input input-bordered w-full input-sm"
              required
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Kategori Barang</span>
            </label>
            <select
              name="kategori_barang"
              value={formData.kategori_barang}
              onChange={handleChange}
              className="select select-bordered w-full select-sm"
              required
            >
              <option value="" disabled>
                Pilih kategori
              </option>
              <option value="Elektronik">Elektronik</option>
              <option value="Pakaian">Pakaian</option>
              <option value="Makanan">Makanan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Jumlah Barang</span>
            </label>
            <input
              type="number"
              name="jumlah_barang"
              value={formData.jumlah_barang}
              onChange={handleChange}
              placeholder="Masukkan jumlah barang"
              className="input input-bordered w-full input-sm"
              min="1"
              required
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Harga per Unit</span>
            </label>
            <input
              type="number"
              name="harga_per_unit"
              value={formData.harga_per_unit}
              onChange={handleChange}
              placeholder="Masukkan harga per unit"
              className="input input-bordered w-full input-sm"
              min="100"
              required
            />
          </div>
          <div className="form-control w-full mb-2">
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
          </div>
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

export default ModalInput;
