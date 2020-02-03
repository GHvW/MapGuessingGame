import { loadModules } from "esri-loader";
import layerStyle from "../resources/gray-basemap-style";
import VectorTileLayer from "esri/layers/VectorTileLayer";

type MapModules = [
    typeof import("esri/layers/VectorTileLayer"),
];

export default function grayLayer() {
    return (loadModules([
        "esri/layers/VectorTileLayer"
    ]) as Promise<MapModules>)
    .then(([VectorTileLayer]) => {
        return new VectorTileLayer({
            style: layerStyle
        })
    })
}