import React, { useEffect, useState } from 'react';
import { ModalBody, ModalHeader } from "reactstrap";

export default function TemperModal(props) {
  console.log(props);
  const [product_Id, setProduct_Id] = useState(undefined)
  const [productId, setProductId] = useState(undefined)
  const [productName, setproductName] = useState(undefined)
  const [productDescription, setproductDescription] = useState(undefined)
  const [productStock, setproductStock] = useState(undefined)

  //  useEffect(()=>{

  //if(selectedUser){
  // setProduct_Id(selectedUser._id)
  //  setProductId(selectedUser.id)
  //setproductName(selectedUser.name)
  //setproductDescription(selectedUser.description)
  //setproductStock(selectedUser.stock)
  //}    
  //  },[selectedUser])

  useEffect(() => {
    getupdateDetail()
  }, [])

  const getupdateDetail = async (id) => {
    console.log("you here 1");
    console.log(id);
    const result = await fetch(`http://localhost:5500/product/:${id}`, {
      method: "get",
      headers: { "content-Type": "application/json" }
    })
    let respond = await result.json();
    console.log(respond);
    setProduct_Id(respond._id)
    setProductId(respond.id)
    setproductName(respond.name)
    setproductDescription(respond.description)
    setproductStock(respond.stock)
  }


  const HandleSave = async ({ product_Id, productId, productName, productDescription, productStock }) => {
    console.log("You click on submit");
    console.log(product_Id);
    alert(productId, productName, productDescription, productStock);
    let result = await fetch(`http://localhost:5500/product/${product_Id}`, {
      method: "put",
      headers: { "content-Type": "application/json" }
    })

    let respond = await result.json()
    if (!respond) {
      alert("no detail found")
    } else {
      alert("Successfully updated")
      setSelectedUser({ productId, productName, productDescription, productStock })
      setmodalView(false)
    }

  }
  return (


      <div className='container' style={{ backgroundColor: "pink", padding: 10, margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "black", fontWeight: "normal" }}>
        <div className='row'>

          <div className='col'>
            <ModalHeader>
              <h1 className='col' >Enter Details</h1>
            </ModalHeader>
            <h1 className='col' ><input type='text' value={product_Id} onChange={(e) => { setProduct_Id(e.target.value) }} placeholder='Enter product _id' /></h1>
            <h1 className='col' ><input type='text' value={productId} onChange={(e) => { setProductId(e.target.value) }} placeholder='Enter product Id' /></h1>
            <ModalBody>
              <h1 className='col' ><input type='text' value={productName} onChange={(e) => { setproductName(e.target.value) }} placeholder='Enter product Name' /></h1>
              <h1 className='col' ><input type='text' value={productDescription} onChange={(e) => { setproductDescription(e.target.value) }} placeholder='Enter product Description' /></h1>
              <h1 className='col' ><input type='text' value={productStock} onChange={(e) => { setproductStock(e.target.value) }} placeholder='Enter product Stock' /></h1>
            </ModalBody>
          </div>
        </div>
        <div className='row'>
          <div className='col' ><button style={{ width: 100, height: 50, borderRadius: 10, borderColor: "pink", backgroundColor: "yellow", color: "red", fontWeight: "normal" }} onClick={() => HandleSave({ productId, productName, productDescription, productStock })}> Save</button></div>
          <div className='col' ><button style={{ width: 100, height: 50, borderRadius: 10, borderColor: "pink", backgroundColor: "yellow", color: "red", fontWeight: "normal" }} onClick={() => (setmodalView(false))}> Close</button></div>
        </div>
      </div>
  )
}

