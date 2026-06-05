import { useEffect, useState } from 'react'

import "./App.css"

// const avtar=[
//   {
//     id:3,
//     name:"memeo",
//     role:"otimized",
//     inttials:"mm",
//   },
  
//   {
//     id:4,
//     name:"mga",
//     role:"otijnxjned",
//     inttials:"mmsa",
//   }
//   ,
//   {
//     id:4,
//     name:"demo",
//     role:"piloowed",
//     inttials:"cumbere23",
//   }
// ]
// function shell({pro,children}){

//   return (
//     <>
//     <section>
//       <h1>kasye ho bhii {pro}</h1>
//       {children}

//     </section>
//     </>
//   )
// }

//   function avatar({avatar,role="pookies"}){

//     return (
//       <article>
//         <p>{avatar.id}</p>
//         <p>{avatar.name}</p>
//         <h1>{avatar.inttials}</h1>
//       </article>
//     )
//   }


//   function App(){
//     return(
//       <>
//       <shell pro="shadaizaa" />
//       <br /><hr />
//       <section>
//         {
//           avtar.map((e,i)=>{
//             return <avatar key={i}
//                avatar={avatar} 
//                role={(avatar.id===3)?"captain":undefined}
//             />
//           })
//         }
//       </section>
//       </>
//     )
//   }


 function App(){
  const [post,setpost]=useState([]);
  const [status,setstatus]=useState('ideal');
  const [second,setSecond]=useState(10);

  useEffect(()=>{
    try{
      async function postgeter() {
      const controller = new AbortController();
        const response= await fetch("linkofapi",{signal:co});
        const data=response.json(response);
        setpost(data);
        setstatus("succeed")
        
      }
  
    }catch(error){
  ///to do 
    }
  },[])


}




export default App
