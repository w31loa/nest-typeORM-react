export interface IUserData{
    email:string
    password:string
}


export interface IUser{
    id:number
    email:string
    access_token:string

}

export interface IResponseUserData{
    user: IResponseUser
    payload: string
}

export interface IResponseUser {
    email: string
    password: string
    id: number
    createdAt: string
    updatedAt: string
}


export interface ICategory{
    title:string
    id:number
    createdAt: string
    updatedAt: string
    transactions: []
}   


// export interface IResponseUserData{
//     email: string  |undefined
//     password: string  |undefined
//     createdAt: string  |undefined
//     updatedAt: string  |undefined
//     __v?:number  |undefined
//     _id?: string  |undefined
//     message: string  |undefined
// }