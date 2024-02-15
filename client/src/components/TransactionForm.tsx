import { FC } from 'react'
import { Form } from 'react-router-dom'

const TransactionForm:FC = () => {
  return (
    <div className=' rounded-md bg-slate-800'>
        <Form className='grid gap 2' method='post' action='/transactions'>
                <label htmlFor="title">
                    <span>title</span>
                    <input className='input' type="text" placeholder='Title...' name='title' required/>
                </label>
                <label htmlFor="amount">
                    <span>amount</span>
                    <input className='input' type="number" placeholder='Amount...' name='amount' required/>
                </label>

                <h1>SELECT</h1>

                <button className=''>

                </button>
        </Form>
    </div>
  )
}

export default TransactionForm