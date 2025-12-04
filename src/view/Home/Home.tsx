import { BlackFriday } from "../../components/BlackFriday";
import { Encabezado } from "../../components/Encabezado";
import { NuevosProductos } from "../../components/NuevosProductos";
import { ScrollingText } from "../../components/ScrollingText";
import { Envios } from "../../components/Envios";
import { Select } from "../../components/Select";
import { FollowUsInstagram } from "../../components/FollowUsInstagram";
import { MiniScrolling } from "../../components/MiniScrolling";
export const Home = () => {
  return (
    <div>
      <Encabezado></Encabezado>
      <ScrollingText text="VENTA POR MAYOR Y MENOR — PRECIOS COMPETITIVOS — CALIDAD GARANTIZADA"></ScrollingText>
      <NuevosProductos></NuevosProductos>
      <BlackFriday></BlackFriday>
      <Envios></Envios>
      <Select></Select>
      <MiniScrolling text="ENVÍO GRATIS EN PEDIDOS A PARTIR $150.000+ 📦 SIGUENOS EN NUESTRAS REDES 🙂"></MiniScrolling>
      <FollowUsInstagram></FollowUsInstagram>
    </div>
  );
};
