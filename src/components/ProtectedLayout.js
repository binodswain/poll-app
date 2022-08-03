import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./navbar/navbar";

export function ProtectedLayout({ children }) {
    const user = useAuth();
    let location = useLocation();


    if (!user) {
        let url = `/login?redirect=${location.pathname}`;
        return <Navigate to={url} state={{ from: location }} replace />;
    }

    return (
        <>
            {user && <Navbar />}
            <section className="container">{children}</section>
        </>
    );
}
