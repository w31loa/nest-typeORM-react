import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {FaBtc, FaSignOutAlt} from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useAuth } from '../hooks/useAuth'
import { logout } from '../features/user/user.slice'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'

const Header:FC = () => {
  
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuth = useAuth()

  const logoutHandler = ()=>{
    dispatch(logout())
    removeTokenFromLocalStorage('token')
    toast.success('You logged out!')
    navigate('/')
  }
  return (
    <header className='flex items-center justify-between bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
        <Link to='/'>
            <FaBtc size={20}/>
        </Link>

        {/* menu */}
        {isAuth &&(
            <nav>
                <ul className='flex items-center gap-5 ml-auto mr-10'>
                  <li>
                      <NavLink to={'/'} className={({ isActive})=> isActive ? 'text-white' : 'text-white/50'}> Home</NavLink>
                  </li>
                  <li>
                      <NavLink to={'/transactions'} className={({ isActive})=> isActive ? 'text-white' : 'text-white/50'}> Transactions</NavLink>
                  </li>
                  <li>
                      <NavLink to={'/categories'} className={({ isActive})=> isActive ? 'text-white' : 'text-white/50'}> Categories</NavLink>
                  </li>
                </ul>
            </nav>
          
          )}


        {/* actions */}
        {
          isAuth ? (
            <button 
              className='btn btn-red'
              onClick={()=> logoutHandler()}
            >
              <span>Log Out</span>
              <FaSignOutAlt />
            </button>
          ) : (
            <Link to={'auth'} className='py-2 text-white/50 hover:text-white'>
              Log In / Sign In
            </Link>
          )
        }
    </header>
  )
}

export default Header