import axios from 'axios';
import React, { useState } from 'react'
import '../style/Form.css'

export default function Form() {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [pengarang, setPengarang] = useState("");
    const [tahunTerbit, setTahunTerbit] = useState("");

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
        <h1>Form Tambah Buku</h1>
        <form onSubmit={addBuku}>
            <div className='input'>
                <label htmlFor="judul">judul :</label> 
                <input type="text" placeholder='Judul' name='judul' id='judul' onChange={(e) => setJudul(e.target.value)} required />
            </div>
            <div className='input'>
                <label htmlFor="deskripsi">deskripsi :</label>
                <input type="text" placeholder='Deskripsi' name='deskripsi' id='deskripsi' onChange={(e) => setDeskripsi(e.target.value)} required />
            </div>
            <div className='input'>
                <label htmlFor="tahunTerbit">Tahun Terbit :</label>
                <input type="text" placeholder='Tahun Terbit' name='tahunTerbit' id='tahunTerbit' onChange={(e) => setTahunTerbit(e.target.value)} required />
            </div>
            <div className='input'>
                <label htmlFor="pengarang">pengarang :</label>
                <input type="text" placeholder='Pengarang' name='pengarang' id='pengarang' onChange={(e) => setPengarang(e.target.value)} required />
            </div>
            <br />
            <button type='submit'>Tambahkan</button>
        </form>
    </div>
  )
}
