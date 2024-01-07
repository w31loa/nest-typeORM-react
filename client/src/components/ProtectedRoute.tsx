import  { FC } from 'react'
import img from '../assets/protected.png'

import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'


interface Props {
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()
  return <>
        {isAuth ? children : (<div className='mt-20 flex flex-col items-center justify-center gap10'>
            <h1 className='text-2xl'>To view this page you must be logged in</h1>
            <img src={img} alt="" className="w-1/3 mb-10" />
            <Link to={'/'} className='bg-sky-500 rounded-md px-8 py-3 hover:bg-sky-500'>Back</Link>
        </div>)}
  </>
}

export default ProtectedRoute