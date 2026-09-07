import { Link } from "react-router";

function Inicio({ productos = [] }) {
    const unidadesDisponibles = productos.reduce(
        (total, producto) => total + producto.stock,
        0,
    );
    const productosStockBajo = productos.filter(
        (producto) => producto.stock > 0 && producto.stock <= 3,
    ).length;

    return (
        <div className="inicio">
            <section className="inicio-hero">
                <div className="inicio-hero-contenido">
                    <p className="inicio-eyebrow">TU ESPACIO DE TRABAJO</p>
                    <h1>Tu inventario,<br />en orden.</h1>
                    <p className="inicio-descripcion">
                        Consulta productos, actualiza existencias y encuentra cada detalle en un solo lugar.
                    </p>
                    <div className="inicio-acciones">
                        <Link className="inicio-btn inicio-btn-principal" to="/inventario">
                            Explorar inventario <span aria-hidden="true">→</span>
                        </Link>
                        <Link className="inicio-btn inicio-btn-secundario" to="/nuevo">
                            + Nuevo producto
                        </Link>
                    </div>
                </div>
            </section>

            <section className="inicio-metricas" aria-label="Resumen del inventario">
                <article className="inicio-metrica">
                    <strong>{productos.length}</strong>
                    <span>Productos registrados</span>
                </article>
                <article className="inicio-metrica">
                    <strong>{unidadesDisponibles}</strong>
                    <span>Unidades disponibles</span>
                </article>
                <article className="inicio-metrica">
                    <strong>{productosStockBajo}</strong>
                    <span>Productos con stock bajo</span>
                </article>
            </section>

            <p className="inicio-pie">Volty · Taller de React Router · Datos guardados en este navegador</p>
        </div>
    );
}

export default Inicio;