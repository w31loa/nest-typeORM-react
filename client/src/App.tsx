import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { useAppDispatch } from "./store/hooks"
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper"
import { toast } from "react-toastify"
import { AuthService } from "./services/auth.service"
import { login, logout } from "./features/user/user.slice"
import { useEffect } from "react"

function App() {
  const dispatch = useAppDispatch()

  const checkAuth = async()=>{
    const token = getTokenFromLocalStorage()
    try{  
        if(token){
          const data = await AuthService.getMe()

          if(data){
            dispatch(login({...data, access_token:token}))
          }else{
            dispatch(logout())
          }
        }
    }catch(err:any){
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }

  useEffect(()=> { //чтобы функция вызывалась всегда
      checkAuth()
  }, [])

  return <RouterProvider router={router}/>
}

export default App
