import { useNavigate } from "react-router";
import FormularioProducto from "../components/FormularioProducto";

function NuevoProducto({ agregarProducto }) {
  const navigate = useNavigate();

  const manejarGuardar = (nuevoProducto) => {
    agregarProducto(nuevoProducto);
    navigate("/inventario");
  };

  return (
    <FormularioProducto onAgregar={manejarGuardar} />
  );
}

export default NuevoProducto;