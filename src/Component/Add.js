import React, { useState } from 'react'

export default function Add() {

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState("")
    const [error, setError]=useState(false);

    const HandleSubmit = async ({ id, name, description, stock }) => {
        console.log({ id,name, description, stock });

        if( !id || !name || !description || !stock){
            alert("must not be empty")
            setError(true)
            return false
        }
        console.log({ id,name, description, stock });
         //let url = "http://localhost:5500/addproduct";


         let result = await fetch("http://localhost:5500/addproduct", {
             method: "post",
             body: JSON.stringify({id,name, description, stock}),
             headers: {
                 'content-Type': "application/json",
             }
         });

         let respond = await result.json();

         if(respond.name){
             alert("Successfully add in record")
             window.location.href="/"
         }else{
             alert("SOrry nnot able to add details")
         }
    }

    return (
        <div className='container' style={{ backgroundColor: "pink", padding: 10, margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "black", fontWeight: "normal" }}>
            <div className='row'>
                <div className='col'>

                    <h1 className='col' >Label</h1>
                    <h1 className='col' >Enter ID : </h1>
                    <h1 className='col' >Enter Name : </h1>
                    <h1 className='col' >Enter Description : </h1>
                    <h1 className='col' >Enter Stock : </h1>

                </div>
                <div className='col'>
                    <h1 className='col' >Enter Details</h1>
                    <h1 className='col' ><input type='number' value={id} onChange={(e) => { setId(e.target.value) }} placeholder='Enter Id' /></h1>
                    {error && !id && <span className='invalid-input' >Please valid id</span>}
                    <h1 className='col' ><input type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' /></h1>
                    {error && !name && <span className='invalid-input' >Please valid name</span>}
                    <h1 className='col' ><input type='text' value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Enter Description' /></h1>
                    {error && !description && <span className='invalid-input'>Please valid details</span>}
                    <h1 className='col' ><input type='number' value={stock} onChange={(e) => { setStock(e.target.value) }} placeholder='Enter Stock' /></h1>
                    {error && !stock && <span className='invalid-input'>Please enter in valid</span>}
                </div>
            </div>

            <div className='col' ><button style={{ width: 100, height: 50, borderRadius: 10, borderColor: "pink", backgroundColor: "yellow", color: "red", fontWeight: "normal" }} onClick={() => HandleSubmit({ id,name, description, stock })}> Submit</button></div>

        </div>
    )
}
