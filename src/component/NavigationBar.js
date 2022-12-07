import axios from "axios";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, InputGroup } from "react-bootstrap";

export default function NavigationBar() {
    const [show, setShow] = useState(false);
    const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  // Mengoper fungsi-fungsi ke dalam komponen
  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  
  const addBuku = async(e) => {
    e.preventDefault();

    try {
        await axios.post("http://localhost:8000/daftarbuku", {
            judul : judul,
            deskripsi : deskripsi,
            pengarang : pengarang,
            tahunTerbit : tahunTerbit
        })
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div>
       <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#modal" onClick={handleShow}>Tambah Buku</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan Buku</Modal.Title>
        </Modal.Header>
            <form onSubmit={addBuku} method="POST">
        <Modal.Body>
            <div className='mb-3'>
                <Form.Label>
                    <strong>Judul</strong>
                </Form.Label>
                <InputGroup className="d-flex gab-3">
                    <Form.Control placeholder="Masukkan Judul" value={judul} onChange={(e) =>setJudul(e.target.value)} />
                </InputGroup>
            </div>
            <div className='mb-3'>
            <Form.Label>
                    <strong>Deskripsi</strong>
                </Form.Label>
                <InputGroup className="d-flex gab-3">
                    <Form.Control placeholder="Masukkan Deskripsi" value={deskripsi} onChange={(e) =>setDeskripsi(e.target.value)} />
                </InputGroup>
            </div>
            <div className='mb-3'>
            <Form.Label>
                    <strong>Tahun Terbit</strong>
                </Form.Label>
                <InputGroup className="d-flex gab-3">
                    <Form.Control placeholder="Masukkan Tahun Terbit" value={tahunTerbit} onChange={(e) =>setTahunTerbit(e.target.value)} />
                </InputGroup>
            </div>
            <div className='input'>
            <Form.Label>
                    <strong>Pengarang</strong>
                </Form.Label>
                <InputGroup className="d-flex gab-3">
                    <Form.Control placeholder="Masukkan Pengarang" value={pengarang} onChange={(e) =>setPengarang(e.target.value)} />
                </InputGroup>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}
