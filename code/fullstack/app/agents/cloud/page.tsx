import React from 'react'

const page = async ({params}:{params:Promise<{ id: string }>}) => {
  const { id }=await params;
  return (
    <div>
      <div>Cloud</div>
    </div>
  )
}

export default page
