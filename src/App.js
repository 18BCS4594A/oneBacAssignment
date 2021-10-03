import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [transection,setTransection] = useState(null);
  const [details,setDetails] = useState({
    userId:1,
    recipientId:2
  })

  useEffect(()=>{
  fetch(`https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=${details.userId}&recipientId=${details.recipientId}`)
    .then((res)=>res.json())
    .then(result => {
     setTransection(result)
    })
    .catch(err => console.log(err))
  
  },[])

  console.log(transection);

  return (
    <div className="App" style={{border:"1px solid black"}}> 
      <nav  style={{borderBottom:"1px solid black"}}>
      <i class="fas fa-arrow-left" style={{float:"left",fontSize:"20px",marginTop:"20px",padding:"2px"}}></i>
      <span style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
      
        </span>

        <span style={{display:"flex",justifyContent:"center",alignItems:'center'}}>
        <span>
          <h4>John Doe</h4>
        </span>
          </span>
       
      </nav>  
      <div className="transactionContainer" >
       <ul style={{padding:"1.2em"}}>
       {transection && transection.transactions.map((data)=>{
           return <li style={{display:"flex",width:"100%",height:"100px",justifyContent:data.direction === 1 && "flex-end",margin:"10px 0 10px 0"}}>
                <div key={data.id} style={{display:"flex",justifyContent:"space-between",border:"1px solid black",backgroundColor:"whitesmoke",width:"50%"}}>
               {data.status !== 2 ?  <div className="left" style={{width:"50%",}}>
                   <span>
                   <h3 style={{marginBottom:10,padding:0}}> Rs:{data.amount}</h3>
                    <p  style={{margin:0,padding:0}}>Transection Id:</p>
                    <p  style={{margin:0,padding:0}}>{data.id}</p>
                   </span>
                  </div> :<span> <h3 style={{marginBottom:10,padding:0}}> Rs:{data.amount}</h3>
                  <button>Cancel</button> </span>}
                <div className="right" style={{width:"50%"}}>
                      {data.direction === 1 ? <h4  style={{marginTop:10,padding:0,color:"limegreen"}}>sent</h4> : <h4  style={{margin:0,padding:0,color:"red"}}>requested</h4>}
                      <p>
                      <i style={{fontSize:"2em"}} class="fas fa-angle-right"></i>
                      </p>
                  </div>
                  </div>
               
             </li>
          })}
       </ul>
      </div>
    </div>
  );
}

export default App;
