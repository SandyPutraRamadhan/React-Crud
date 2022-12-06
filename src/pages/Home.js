import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function () {
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
        console.log("Terjadi Kesalahan " + error);
      });
  };

  const getBukuById = (book) => {
    setBookId(book.id);
    setJudul(book.judul);
    setDeskripsi(book.deskripsi);
    setTahunTerbit(book.tahunTerbit);
    setPengarang(book.pengarang);
  };

  const edit = async (e) => {
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
    <div className="container my-5">
      <table class="table table-sm">
        <thead>
          <th>No</th>
          <th>Judul</th>
          <th>Deskrpsi</th>
          <th>Tahun Terbit</th>
          <th>Pengarang</th>
          <th>Action</th>
        </thead>
        <tbody class="table-group-divider">
          {buku.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.deskripsi}</td>
                <td>{book.tahunTerbit}</td>
                <td>{book.pengarang}</td>
                <td>
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => deleteBuku(book.id)}
                  >
                    Hapus
                  </Button>
                  <a href={"/edit/" + book.id}>
                    <Button variant="success" className="mx-1">
                      Ubah
                    </Button>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
