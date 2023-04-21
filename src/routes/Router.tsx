import { RouteObject } from "react-router";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Cart from "../pages/Cart";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/cart", element: <Cart />},
            { path: "/not-found", element: <NotFound />},
            { path: "*", element: <Navigate replace to='/not-found'/>},
        ]
    }
];

export const router = createBrowserRouter(routes);