import { NavLink } from "react-router";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/inventario">Inventario</NavLink>
            <NavLink to="/nuevo">Nuevo producto</NavLink>
            <NavLink to="/acerca">Acerca</NavLink>
        </nav>
    )
};

export default Navbar;