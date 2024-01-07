import { useAppSelector } from './../store/hooks';
export const  useAuth = ():boolean =>{
    const isAuth = useAppSelector((state)=>{
        return state.user.isAuth
    })
    return isAuth
}