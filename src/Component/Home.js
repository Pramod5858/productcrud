import React, { useEffect, useState } from 'react'

export default function Home() {

  const [data, setData] = useState([]);
  //const [modalView, setmodalView] = useState(false);
  //const [selectedUser, setSelectedUser] = useState(undefined);

  const HandleDelete = async (id) => {
    console.log("You clicked Delete");
    console.log(id);
    //    let url = "http://localhost:5500/product";
    const result = await fetch(`http://localhost:5500/product/${id}`, {
      method: "delete",
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

    let result = await fetch(url);

    let responsed = await result.json();

    setData(responsed.detail);

  }

  //  const toggleModal

  return (
    <div className='container-fluid' >
      <div>
        <div className='row'>
          <div className='col-md-10'>
            <div className='row'>
              <div className='col'><h4>ID</h4></div>
              <div className='col'><h4>Name</h4></div>
              <div className='col'><h4>Description</h4></div>
              <div className='col'><h4>Stock</h4></div>
              <div className='col'><h4>Operation</h4></div>
            </div>
            {

              data.length > 0 ? data.map((item) => {
                return (
                  <div key={item._id} className='row'>

                    <div className='col'><p>{item.id}</p></div>
                    <div className='col'><p>{item.name}</p></div>
                    <div className='col'><p>{item.description}</p></div>
                    <div className='col'><p>{item.stock}</p></div>
                    <div className='col'>
                      <div className='row'>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => HandleEdit(item._id)} >
                          Edit
                        </button>
                        <div className='col'><button style={{ borderRadius: 10, borderColor: "pink", backgroundColor: "yellow", color: "red", fontWeight: "normal" }} onClick={() => HandleDelete(item._id)}>Delete</button></div>
                      </div>
                    </div>
                  </div>
                )
              }) : <div><h1>No data inside </h1></div>
            }

          </div>
          <div className='col-md-2'>2</div>
        </div>

        <div>
          {/* <!-- Button trigger modal --> */}


          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Product</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <h1 className='col' ><input type='text'  placeholder='Enter product Name' /></h1>
              <h1 className='col' ><input type='text'  placeholder='Enter product Description' /></h1>
              <h1 className='col' ><input type='text'  placeholder='Enter product Stock' /></h1>

                                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div >
  )
}

// export const tempmodal = () => {
// return(
//   <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//   <div style={{ backgroundColor: "white", padding: 40, borderRadius: 10, msScrollbarDarkshadowColor: "red", elivation: 5, shadowOpacity: 0.5 }}>
//     <h1>Dummy Text</h1>
//     <button >CLose</button>
//   </div>
// </div>

// )
// }


//  <modal visible={modalView} transparent={true}>
// <usermodal1 setmodalView={setmodalView} selectedUser={selectedUser} />
// </modal>

// export const usermodal1 = (props) => {
//   return (
//     <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <div style={{ backgroundColor: "white", padding: 40, borderRadius: 10, msScrollbarDarkshadowColor: "red", elivation: 5, shadowOpacity: 0.5 }}>
//         <h1>Dummy Text</h1>
//         <button onClick={() => props.setmodalView(false)}>CLose</button>
//       </div>
//     </div>
//   )
// }

const HandleEdit = (id) => {
  console.log("You clicked edit");
  console.log(id)
//    setmodalView(true)
//    setSelectedUser(id)
}