import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Auth from "../pages/Auth";
import Transactions from "../pages/Transactions";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'transactions',
                element: <ProtectedRoute>
                             <Transactions/>
                         </ProtectedRoute>
            },
            {
                path: 'categories',
                element: <ProtectedRoute>
                             <Categories/>
                         </ProtectedRoute>
            },
            {
                path: 'auth',
                element: <Auth/>
            }
        ]
    }
])