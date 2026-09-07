import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Inventario from "./pages/Inventario";
import NuevoProducto from "./pages/NuevoProducto";
import DetalleProducto from "./pages/DetalleProducto";
import Acerca from "./pages/Acerca";
import NoEncontrado from "./pages/NoEncontrado";
import Navbar from "./components/Navbar.jsx";
import { obtenerProductosIniciales } from "./data/productos.js";

function App() {
  const [productos, setProductos] = useState(obtenerProductosIniciales);
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("inventario", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const eliminarProductos = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer."
    );

    if (!confirmar) return;

    const nuevaLista = productos.filter((producto) => producto.id !== id);

    setProductos(nuevaLista);
    alert("Producto eliminado");
  };

  const modificarStock = (id, cambio) => {
    const nuevosProductos = productos.map((producto) => {
      if (producto.id === id) {
        return {
          ...producto,
          stock: Math.max(0, producto.stock + cambio),
        };
      }
      return producto;
    });
    setProductos(nuevosProductos);
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
    console.log("Producto a editar:", producto);
  };

  const actualizarProducto = (actualizado) => {
    const nuevaLista = productos.map((producto) =>
      producto.id === actualizado.id ? actualizado : producto
    );

    setProductos(nuevaLista);
    setProductoEditando(null);
    alert("Producto editado correctamente");
  };

  return (
    <main className="contenedor">
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio productos={productos} />} />
        <Route
          path="/inventario"
          element={
            <Inventario
              productos={productos}
              agregarProducto={agregarProducto}
              eliminarProductos={eliminarProductos}
              modificarStock={modificarStock}
              editarProducto={editarProducto}
              actualizarProducto={actualizarProducto}
              productoEditando={productoEditando}
              setProductoEditando={setProductoEditando}
            />
          }
        />
        <Route
          path="/nuevo"
          element={<NuevoProducto agregarProducto={agregarProducto} />}
        />
        <Route path="/acerca" element={<Acerca />} />
        <Route
          path="/productos/:id"
          element={<DetalleProducto productos={productos} />}
        />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </main>
  );
}

export default App;