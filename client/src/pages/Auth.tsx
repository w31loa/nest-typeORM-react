import { FC, useState } from "react"

const Аuth: FC = () => {
  const [isLogin , setIsLogin] = useState<boolean>(false)
  return (
    <div className="mt-40 flex-col justify-center items-center bg-slate-900 text-white">
        <h1 className="text-center text-xl mb-10">
          {isLogin ? 'Login':'Registration'}
        </h1>
    </div>
  )
}

export default Аuth