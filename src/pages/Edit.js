import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, useParams } from "react-router-dom";

export default function Edit() {
  const param = useParams();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/daftarbuku/" + param.id)
      .then((response) => {
        const newBook = response.data;
        setJudul(newBook.judul);
        setDeskripsi(newBook.deskripsi);
        setTahunTerbit(newBook.tahunTerbit);
        setPengarang(newBook.pengarang);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan Sir! " + error);
      });
  },[]);

  const submitActionHandler = async (e) => {
    e.preventDefault();

    await axios
      .put("http://localhost:8000/daftarbuku/" + param.id, {
        judul: judul,
        deskripsi: deskripsi,
        tahunTerbit: tahunTerbit,
        pengarang: pengarang,
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  };
  return (
    <div className="edit mx-5">
        <div className="container my-5">
      <Form onSubmit={submitActionHandler}>
          <div className="mb-3">
            <Form.Label>
              <strong>Judul</strong>
            </Form.Label>
            <InputGroup className="d-flex gab-3">
              <Form.Control
                placeholder="Masukkan Judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="place-of-birth mb-3">
            <Form.Label>
              <strong>Deskripsi</strong>
            </Form.Label>
            <InputGroup className="d-flex gab-3">
              <Form.Control
                placeholder="Masukkan Deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="mb-3">
            <Form.Label>
              <strong>Tahun Terbit</strong>
            </Form.Label>
            <InputGroup className="d-flex gab-3">
              <Form.Control
                placeholder="Masukkan Tahun Terbit"
                value={tahunTerbit}
                onChange={(e) => setTahunTerbit(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="place-of-birth mb-3">
            <Form.Label>
              <strong>Pengarang</strong>
            </Form.Label>
            <InputGroup className="d-flex gab-3">
              <Form.Control
                placeholder="Masukkan Pengarang"
                value={pengarang}
                onChange={(e) => setPengarang(e.target.value)}
              />
            </InputGroup>
          </div>
        <div className="d-flex justify-content-end align-items-center mt-2">
          <button className="buton btn" type="submit">
            Save
          </button>
        </div>
      </Form>
        </div>
    </div>
  );
}
