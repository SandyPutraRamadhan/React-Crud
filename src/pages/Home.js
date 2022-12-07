import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'

export default function() {
  const [buku, setBuku] = useState([]);

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

  const deleteBuku = async (id) => {
    await axios.delete("http://localhost:8000/daftarbuku/" + id).then(() => {
      Swal.fire({
        title: 'Apakah Yakin Ingin Delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tetap Delete!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Berhasil Men Delete!',
            'File Anda Telah Di Delete',
            'success'
          )
          window.location.reload();
        }
      })
    });
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
          {localStorage.getItem("id") !== null ? <th>Action</th> : <></>}
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
                {localStorage.getItem("id") !== null ? (
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
                ) : <></>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
