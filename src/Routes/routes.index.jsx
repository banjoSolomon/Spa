import Layout from "../Componet/Layout";
import Home from "../Pages/Home";

export const ROUTES = [
    {
        path: '/',
        element: <Layout/>,
        children : [
            {
                path: '/',
                element: <Home/>
            },

        ]
    }
]