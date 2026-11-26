import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Geist } from 'next/font/google'

const giest=Geist({
    subsets: ['latin'],

  weight:["400","600","700"]


})




function About() {
  return (
     
    <div>
      <div>abouts</div>
      <Link href={"/agents/cloud"} >go to cloud page </Link>
      <Link href={"/cathall/1"} >go to cloud page </Link>

      <Link
      href={{
        pathname: '/agents/cloud',
        query: { name: 'test' },
      }}
    >
      About
    </Link>
     <Image
      src="/file.svg"
      width={100}
      height={100}
      alt="Picture of the author"
    />
    </div>
  )
}

export default About
