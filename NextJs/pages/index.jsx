import Link from 'next/link';
import React from 'react'
import Nav from '../src/components/Nav';
import '../src/style.module.css'
const Index = () => {
  return (
    <div >
      <Nav/>
      <h1 className="body" >Index Page</h1>
      <Link href="/notes"> Notes </Link>
    </div>
  )
}

export default Index;
