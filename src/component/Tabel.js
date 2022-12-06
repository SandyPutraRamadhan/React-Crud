import axios from "axios";
import React, { useState, useEffect } from "react";
import "../style/Table.css";

export default function Tabel() {
  const [buku, setBuku] = useState([]);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [bookId, setBookId] = useState(0);

  const getAllBuku = async () => {
    await axios
      .get("http://localhost:8000/daftarbuku")
      .then((response) => {
        setBuku(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBukuById = (book) => {
    setBookId(book.id);
    setJudul(book.judul);
    setDeskripsi(book.deskripsi);
    setTahunTerbit(book.tahunTerbit);
    setPengarang(book.pengarang);
  };

  const updateBuku = async (e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:8000/daftarbuku/" + bookId, {
        judul: judul,
        deskripsi: deskripsi,
        tahunTerbit: tahunTerbit,
        pengarang: pengarang,
      })
      .then(() => {
        setBookId(0);
        alert("Succes");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const deleteBuku = async (id) => {
    await axios.delete("http://localhost:8000/daftarbuku/" + id).then(() => {
      alert("Sukses Hapus");
    });
    window.location.reload();
  };

  useEffect(() => {
    getAllBuku();
  }, []);
  return (
    <div className="Tabel">
      <div>
        <h1>Form Edit Buku</h1>
        <form onSubmit={updateBuku}>
          <div className="input">
            <label htmlFor="judul">judul :</label>
            <input
              type="text"
              placeholder="Judul"
              name="judul"
              id="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="deskripsi">deskripsi :</label>
            <input
              type="text"
              placeholder="Deskripsi"
              name="deskripsi"
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="tahunTerbit">Tahun Terbit :</label>
            <input
              type="text"
              placeholder="Tahun Terbit"
              name="tahunTerbit"
              id="tahunTerbit"
              value={tahunTerbit}
              onChange={(e) => setTahunTerbit(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="pengarang">pengarang :</label>
            <input
              type="text"
              placeholder="Pengarang"
              name="pengarang"
              id="pengarang"
              value={pengarang}
              onChange={(e) => setPengarang(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="daftar">
        <h1>Daftar Buku</h1>
        <table>
          <thead>
            <th>No</th>
            <th>Judul</th>
            <th>Deskrpsi</th>
            <th>Tahun Terbit</th>
            <th>Pengarang</th>
            <th>Action</th>
          </thead>
          <tbody>
            {buku.map((book, index) => {
              return (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.judul}</td>
                  <td>{book.deskripsi}</td>
                  <td>{book.tahunTerbit}</td>
                  <td>{book.pengarang}</td>
                  <td>
                    <button className="edit" onClick={() => getBukuById(book)}>
                      Edit
                    </button>
                    ||
                    <button
                      className="delete"
                      onClick={() => deleteBuku(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
