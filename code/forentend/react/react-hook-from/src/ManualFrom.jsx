import React, { useState } from 'react'

function ManualFrom() {
  const [value,setValue]=useState({
    name:"",
    email:"",
    rolle:"pagyego",

  });
  const [error,setError]=useState({}); 
  const[submit,setsubmit]=useState(false);
  
  function set(fields){
    return (e)=> setValue((v)=>({...v,[fields]:e.target.value}))// change event ke though current value ko nikal na input sye 


  }

  function validate (v){
    e={};
    if(!v.name.trim()) e.name="nmae are the required"
    if(!v.email.trim()) e.email="email field are required "
    
  }
  function submithandler(ev){

    ev.preventDefalut();
    const e=validate(value);
    setError(e);
    if(Object.keys(e).length===0) setsubmit(true)



  }
  if(submit){
    return (
      <div>
        <h1> validation succesfull </h1>
      </div>
    )
  }

  return (
    <>
     <form onSubmit={submithandler} noValidate>
      <label >
        full name
        <input value={value.name} onChange={set('name')} />
      </label>
      <label >
        email
        <input value={value.email} onChange={set('email')} />
      </label>
     </form>
    <button type='submit' ></button>
    </>
  )
}

export default ManualFrom
