import { useState, useEffect } from "react";

function FormularioProducto({ onAgregar, productoEditando, onActualizar, onCancelar }) {

    const [formulario, setFormulario] = useState({
        nombre: "",
        precio: "",
        categoria: "",
        stock: "",
        imagen: ""
    });

    useEffect(() => {
        if (productoEditando) {
            setFormulario({
                nombre: productoEditando.nombre,
                categoria: productoEditando.categoria,
                precio: productoEditando.precio,
                stock: productoEditando.stock,
                imagen: productoEditando.imagen
            })
        }
    }, [productoEditando]);

    const manejarCambio = (evento) => {
        setFormulario({
            ...formulario,
            [evento.target.name]: evento.target.value
        });
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        if (
            formulario.nombre.trim() === "" ||
            formulario.categoria.trim() === "" ||
            Number(formulario.precio) <= 0 ||
            Number(formulario.stock) < 0 ||
            formulario.imagen.trim() === ""
        ) {
            alert("Revisa los datos del producto");
            return;
        }

        if (productoEditando) {
            const productoActualizado = {
                id: productoEditando.id,
                nombre: formulario.nombre,
                precio: Number(formulario.precio),
                categoria: formulario.categoria,
                stock: Number(formulario.stock),
                imagen: formulario.imagen
            };

            onActualizar(productoActualizado);
        } else {
            const nuevoProducto = {
                id: Date.now(),
                nombre: formulario.nombre,
                precio: Number(formulario.precio),
                categoria: formulario.categoria,
                stock: Number(formulario.stock),
                imagen: formulario.imagen
            };

            onAgregar(nuevoProducto);
        }

        setFormulario({
            nombre: "",
            precio: "",
            categoria: "",
            stock: "",
            imagen: ""
        });
    };



    return (
        <form onSubmit={manejarEnvio} className="formulario-producto">

            <h2>
                {productoEditando
                    ? "Editar producto"
                    : "Agregar producto"
                }
            </h2>

            <div className="campo-formulario">
                <label>Nombre del producto</label>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ej: Mouse inalámbrico"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                />
            </div>

            <div className="campo-formulario">
                <label>Categoría</label>
                <select
                    className="select-form"
                    name="categoria"
                    value={formulario.categoria}
                    onChange={manejarCambio}
                >
                    <option value="" disabled>Escoger categoría</option>
                    <option value="Perifericos">Periféricos</option>
                    <option value="Pantallas">Pantallas</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Audio">Audio</option>
                    <option value="Mobiliario">Mobiliario</option>
                    <option value="Almacenamiento">Almacenamiento</option>
                </select>
            </div>

            <div className="campo-formulario">
                <label>Precio</label>
                <input
                    type="number"
                    name="precio"
                    placeholder="Ej: 50000"
                    value={formulario.precio}
                    onChange={manejarCambio}
                />
            </div>

            <div className="campo-formulario">
                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    placeholder="Ej: 10"
                    value={formulario.stock}
                    onChange={manejarCambio}
                />
            </div>

            <div className="campo-formulario">
                <label>URL de la imagen</label>
                <input
                    type="text"
                    name="imagen"
                    placeholder="Ej: https://sitio.com/imagen.jpg"
                    value={formulario.imagen}
                    onChange={manejarCambio}
                />
            </div>

            <button
                type="submit"
                className="btn-agregar"
            >
                {productoEditando
                    ? "Guardar cambios"
                    : "Agregar producto"
                }
            </button>

            {productoEditando && (
                <button
                    type="button"
                    className="btn-cancelar"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>
            )}

        </form>
    );
}

export default FormularioProducto;