import { useRouter } from 'next/router'
import React from 'react'

const Page = () => {
    const Router = useRouter();
    const { params } = Router.query;
    console.log(params)
    return (
        <div>Page</div>
    )
}

export default Page