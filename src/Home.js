import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody } from "reactstrap"

export default function Home() {

  const [data, setData] = useState([]);
  const [modalView, setmodalView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);


  const HandleDelete = async (id) => {
    console.log("You clicked Delete");
    console.log(id);
    //    let url = "http://localhost:5500/product";
    const result = await fetch(`http://localhost:5500/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    let respond = await result.json();

    if (respond) {
      alert("successfully deleted")
      window.location.href = "/"
    } else {
      alert("Not able to delete")
    }
  }

  useEffect(() => {
    getdetails()
  }, [])

  //console.log(data);


  const getdetails = async () => {

    //    let url = "http://172.24.240.1:3000/car";
    let url = "http://localhost:5500/get";

    let result = await fetch(url, {
      method: "get",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    let responsed = await result.json();

    setData(responsed.detail);

  }

  function toggle({ item }) {
    setmodalView(true)
    setSelectedUser(item)
  }

  //  const toggleModal

  return (
    <div className='container-fluid' >
      <table className="table">
        
          <th className="table-primary" scope="col">ID</th>
          <th className="table-secondary" scope="col">Name</th>
          <th className="table-success" scope="col">Description</th>
          <th className="table-danger" scope="col">Stock</th>
          <th className="table-warning" scope="col">Operation</th>
        
        {
          data.length > 0 ? data.map((item) => {
            return (
              <tr key={item._id}>
                <td className="table-primary">{item.id}</td>
                <td className="table-secondary">{item.name}</td>
                <td className="table-success">{item.description}</td>
                <td className="table-danger">{item.stock}</td>
                <div className='row'>
                <td className='col'><button type="button" className="btn btn-success" onClick={() => toggle({ item })}>Edit</button></td>
                <td className='col'><button type="button" className="btn btn-danger" onClick={() => HandleDelete(item._id)}>Delete</button></td>
                </div>
              </tr>
            )
          }) : <h1>No data inside </h1>
        }
        {/* <!-- Button trigger modal --> */}
        <Modal isOpen={modalView} size='lg'>
          <ModalHeader >Edit Product</ModalHeader>
          <ModalBody>
            <HandleEdit SelectedUser={selectedUser} setmodalView={setmodalView} getdetails={getdetails} />
          </ModalBody>
        </Modal>
      </table>
    </div >
  )
}

const HandleEdit = ({ SelectedUser, setmodalView, getdetails }) => {

  console.log(SelectedUser);


  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState("")
  const [error, setError] = useState(false);

  useEffect(() => {

    setId(SelectedUser.id)
    setName(SelectedUser.name)
    setDescription(SelectedUser.description)
    setStock(SelectedUser.stock)

  }, [SelectedUser])


  const HandleSubmit = async ({ id, name, description, stock }) => {
    console.log({ name, description, stock });

    if (!id || !name || !description || !stock) {
      alert("must not be empty")
      setError(true)
      return false
    }
    console.log({ id, name, description, stock });

    //const url = "http://localhost:5500/product";
    const _id = SelectedUser._id


    let result = await fetch(`http://localhost:5500/product/${_id}`, {
      method: "put",
      body: JSON.stringify({ id, name, description, stock }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }

    })

    let respond = await result.json()

    if (!respond.updateDetails) {
      alert("something is missing")
    }
    alert("Successfully updated")
    getdetails();
    setmodalView(false)
  }

  return (
    <div className='container' style={{ backgroundColor: "pink", padding: 10, margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "black", fontWeight: "normal" }}>
      <div className='row'>
        <div className='col'>
          <h1 className='col' ><input type='number' value={id} onChange={(e) => { setId(e.target.value) }} placeholder='Enter Id' /></h1>
          {error && !id && <span className='invalid-input' >Please valid id</span>}
          <h1 className='col' ><input type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' /></h1>
          {error && !name && <span className='invalid-input' >Please valid name</span>}
          <h1 className='col' ><input type='text' value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Enter Description' /></h1>
          {error && !description && <span className='invalid-input'>Please valid details</span>}
          <h1 className='col' ><input type='number' value={stock} onChange={(e) => { setStock(e.target.value) }} placeholder='Enter Stock' /></h1>
          {error && !stock && <span className='invalid-input'>Please enter in valid</span>}
        </div>
        <div className='col'>
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="../images/image4.jpg" className="h-100 d-inline-block w-100" alt="not Found1" />
              </div>
              <div className="carousel-item">
                <img src="../images/image5.jpg" className="h-100 d-inline-block w-100" alt="not Found2" />
              </div>
              <div className="carousel-item">
                <img src="../images/image6.jpg" className="h-100 d-inline-block w-100" alt="not Found3" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className='col' ><button style={{ width: 100, height: 50, borderRadius: 10, borderColor: "pink", backgroundColor: "yellow", color: "red", fontWeight: "normal" }} onClick={() => HandleSubmit({ id, name, description, stock })}> Submit</button></div>

    </div>
  )
}

