import { NavLink } from "react-router";

function ProductoCard({ producto, onEliminar, modificarStock, onEditar }) {
    const {
        nombre, precio, categoria, stock, imagen
    } = producto;
    const estado = stock > 0 ? "Disponible" : "Agotado";
    const mostrarProducto = () => {
        alert(`Seleccionaste ${nombre}`);
    };
    const formatearPrecio = precio => {
        return precio.toLocaleString("es-CO");
    };

    return (
        <article className="producto-card">

            <h2>{nombre}</h2>

            {imagen && (
                <img
                    src={imagen}
                    alt={nombre}
                    className="imagen-producto"
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                />
            )}

            <p>
                <strong>Categoría:</strong> {categoria}
            </p>

            <p className="precio-producto">
                <strong>Precio:</strong> ${formatearPrecio(precio)}
            </p>

            <div className="control-stock">

                <span>Stock</span>

                <div className="botones-stock">

                    <button
                        className="btn-stock btn-restar"
                        onClick={() => modificarStock(producto.id, -1)}
                        disabled={stock === 0}
                    >
                        -
                    </button>

                    <strong className="cantidad-stock">
                        {stock}
                    </strong>

                    <button
                        className="btn-stock btn-sumar"
                        onClick={() => modificarStock(producto.id, 1)}
                    >
                        +
                    </button>

                </div>

            </div>

            <strong className="estado-producto">
                {estado}
            </strong>

            <div className="acciones-producto">

                <button
                    className="btn-producto"
                    onClick={mostrarProducto}
                    disabled={stock === 0}
                >
                    {stock > 0 ? "Ver producto" : "Agotado"}
                </button>

                <button
                    className="btn-eliminar"
                    onClick={() => onEliminar(producto.id)}
                >
                    Eliminar
                </button>

            </div>

            <div className="acciones-producto">
                <button onClick={() => onEditar(producto)}>
                    Editar
                </button>
            </div>

            <NavLink to={`/productos/${producto.id}`}>
                Ver detalle
            </NavLink>

        </article>
    );



    /*Usamos filter() porque éste crea un arreglo más en el que se mostrarán 
    todos los productos EXCEPTO el que fue eliminado, en cambio usando find()
    no se creará ningún arreglo y solo se mostrará un objeto que cumpla con 
    una unica condición */
}
export default ProductoCard;