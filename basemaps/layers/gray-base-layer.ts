import { loadModules } from "esri-loader";
import layerStyle from "../resources/gray-basemap-style"

export default function grayLayer() {
    return loadModules([
        "esri/layers/VectorTileLayer"
    ])
    .then(([VectorTileLayer]) => {
        return new VectorTileLayer({
            style: layerStyle
        })
    })
}