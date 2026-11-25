import React from 'react'

const page = async({params}: {params: Promise<{ slugs: string[] }>}) => {
  const { slugs } = await params;
  return (
    <div>
      all the slugs page {slugs.join(', ')}
    </div>
  )
}

export default page
