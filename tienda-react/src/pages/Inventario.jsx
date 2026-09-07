import { useState } from "react";
import ProductoCard from "../components/ProductoCard";
import FormularioProducto from "../components/FormularioProducto";

function Inventario({
  productos,
  agregarProducto,
  eliminarProductos,
  modificarStock,
  editarProducto,
  actualizarProducto,
  productoEditando,
  setProductoEditando,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [orden, setOrden] = useState("normal");

  const disponibles = productos.filter((producto) => producto.stock > 0);
  const noDisponibles = productos.filter((producto) => producto.stock === 0);
  const valorInventario = productos.reduce(
    (total, producto) => total + producto.precio * producto.stock,
    0,
  );
  const productosPorCategoria = productos.reduce((conteo, producto) => {
    conteo[producto.categoria] = (conteo[producto.categoria] || 0) + 1;
    return conteo;
  }, {});

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoria === "Todas" || producto.categoria === categoria;
    const coincideStock = !soloDisponibles || producto.stock > 0;

    return coincideNombre && coincideCategoria && coincideStock;
  });

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === "az") return a.nombre.localeCompare(b.nombre);
    if (orden === "pMenorAMayor") return a.precio - b.precio;
    if (orden === "pMayorAMenor") return b.precio - a.precio;
    if (orden === "sMenorAMayor") return a.stock - b.stock;
    if (orden === "sMayorAMenor") return b.stock - a.stock;
    return 0;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoria("Todas");
    setSoloDisponibles(false);
    setOrden("normal");
  };

  return (
    <>
      <header className="banner-titulo">
        <h1 className="tiutle">Tienda tecnológica</h1>
        <div className="resumen-inventario">
          <p>
            <strong>Disponibles:</strong> {disponibles.length}
          </p>
          <p>
            <strong>Valor inventario:</strong> $
            {valorInventario.toLocaleString()}
          </p>
          <p>
            <strong>Agotados:</strong> {noDisponibles.length}
          </p>
        </div>
      </header>

      <section className="resumen-categorias">
        {Object.entries(productosPorCategoria).map(([categoria, cantidad]) => (
          <span key={categoria} className="badge-categoria">
            {categoria}: {cantidad}
          </span>
        ))}
      </section>

      <section className="panel-filtros">
        <div className="grupo-busqueda">
          <input
            type="text"
            className="input-busqueda"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>

        <div className="grupo-controles">
          <select
            className="select-filtro"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
          >
            <option value="Todas">Todas las categorías</option>
            <option value="Perifericos">Periféricos</option>
            <option value="Pantallas">Pantallas</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Audio">Audio</option>
            <option value="Mobiliario">Mobiliario</option>
            <option value="Almacenamiento">Almacenamiento</option>
          </select>

          <select
            className="select-filtro"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="normal">Sin ordenar</option>
            <option value="az">Nombre A-Z</option>
            <option value="pMenorAMayor">Precio: Menor a Mayor</option>
            <option value="pMayorAMenor">Precio: Mayor a Menor</option>
            <option value="sMenorAMayor">Stock: Menor a Mayor</option>
            <option value="sMayorAMenor">Stock: Mayor a Menor</option>
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={soloDisponibles}
              onChange={(evento) => setSoloDisponibles(evento.target.checked)}
            />
            Mostrar únicamente disponibles
          </label>

          <button className="btn-limpiar" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
        </div>
      </section>

      <div className="info-resultados">
        <p>
          Productos encontrados: <strong>{productosOrdenados.length}</strong>
        </p>
      </div>

      <section className="productos-grid">
        {productosOrdenados.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onEliminar={eliminarProductos}
            modificarStock={modificarStock}
            onEditar={editarProducto}
          />
        ))}
      </section>

      {productosOrdenados.length === 0 && (
        <div className="sin-resultados">
          <p>No se encontraron productos que coincidan con la búsqueda.</p>
        </div>
      )}

      <section className="FormAddProd">
        <FormularioProducto onAgregar={agregarProducto} />
      </section>

      {productoEditando && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <FormularioProducto
              productoEditando={productoEditando}
              onActualizar={actualizarProducto}
              onCancelar={() => setProductoEditando(null)}
              onAgregar={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Inventario;