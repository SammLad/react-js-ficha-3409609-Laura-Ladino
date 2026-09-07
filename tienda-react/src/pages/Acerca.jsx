import { Link } from "react-router";

function Acerca() {
    return (
        <div className="acerca">
            <section className="acerca-encabezado">
                <p className="inicio-eyebrow">SOBRE VOLTY</p>
                <h1>Una forma clara de<br />cuidar tu inventario.</h1>
                <p>
                    Volty es una herramienta sencilla para registrar productos,
                    consultar existencias y mantener cada actualización en un solo lugar.
                </p>
            </section>

            <section className="acerca-grid">
                <article className="acerca-bloque">
                    <span className="acerca-numero">01</span>
                    <h2>Organiza</h2>
                    <p>Registra productos con su nombre, categoría, precio y cantidad disponible.</p>
                </article>
                <article className="acerca-bloque">
                    <span className="acerca-numero">02</span>
                    <h2>Controla</h2>
                    <p>Filtra, ordena y modifica el stock para encontrar la información que necesitas.</p>
                </article>
                <article className="acerca-bloque">
                    <span className="acerca-numero">03</span>
                    <h2>Decide</h2>
                    <p>Identifica rápidamente los productos agotados o con pocas unidades disponibles.</p>
                </article>
            </section>

            <div className="acerca-acciones">
                <Link className="inicio-btn inicio-btn-principal" to="/inventario">Ir al inventario <span aria-hidden="true">→</span></Link>
                <Link className="inicio-btn inicio-btn-secundario" to="/nuevo">Registrar producto</Link>
            </div>
        </div>
    );
}

export default Acerca;