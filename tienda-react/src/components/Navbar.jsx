import { NavLink } from "react-router";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink className="navbar-brand" to="/" end>
                <span className="navbar-brand-mark" aria-hidden="true">Volty</span>
            </NavLink>
            <div className="navbar-links">
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/inventario">Inventario</NavLink>
                <NavLink to="/nuevo">Nuevo producto</NavLink>
                <NavLink to="/acerca">Acerca</NavLink>
            </div>
        </nav>
    )
};

export default Navbar;