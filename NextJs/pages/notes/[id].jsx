import { useRouter,withRouter } from 'next/router'
import React from 'react'

const Page = () => {
  const params = useRouter();
  console.log(params.query);
  const {id}= params.query;
  return (
    <div>id path {id}</div>
  )
}

export default Page