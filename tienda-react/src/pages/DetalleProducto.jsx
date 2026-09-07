import { useParams } from "react-router";
import { NavLink } from "react-router";

function DetalleProducto({ productos }) {
  const { id } = useParams();

  const producto = productos.find(
    item => String(item.id) === id
  );

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section>
      <h1>{producto.nombre}</h1>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <p>Categoría: {producto.categoria}</p>
      <NavLink to={`/productos/${producto.id}`}>
        Ver detalle
      </NavLink>
    </section>  

    
  );
}

export default DetalleProducto;