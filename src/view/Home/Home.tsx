import { BlackFriday } from "../../components/BlackFriday";
import { Encabezado } from "../../components/Encabezado";
import { NuevosProductos } from "../../components/NuevosProductos";
import { ScrollingText } from "../../components/ScrollingText";
export const Home = () => {
  return (
    <div>
      <Encabezado></Encabezado>
      <ScrollingText text="VENTA POR MAYOR Y MENOR — PRECIOS COMPETITIVOS — CALIDAD GARANTIZADA"></ScrollingText>
      <NuevosProductos></NuevosProductos>
      <BlackFriday></BlackFriday>
    </div>
  );
};
