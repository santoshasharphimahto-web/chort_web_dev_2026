import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
function HookFrom() {

  const {register,handleSubmit,
    formState:{errors ,isSubmitSuccessful,isSubmitting}, 
  }=useForm()
  function submit( data){
    return new Promise((res)=>console.log(data))

  }
  return (
    <>  
    <form onSubmit={ handleSubmit(submit)}>
      <label>
        fullName
        <input {...register("name",{required:"name is required"})}/>
      </label>
      <label >
        <input {...register("email",{required:"email is required !"})} />
      </label>
    </form>
    </>
  )
}


export default HookFrom
