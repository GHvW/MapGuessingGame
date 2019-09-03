// create own basemap
// https://www.esri.com/arcgis-blog/products/developers/mapping/design-custom-basemaps-with-the-new-arcgis-vector-tile-style-editor/
// vector tile layer from json : https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer-json/index.html

import { loadModules } from "esri-loader";
import grayLayer from "../basemaps/layers/gray-base-layer";

grayLayer()
    .then((vectorLayer) => {
        loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/Basemap",
            "esri/layers/VectorTileLayer"
        ])
        .then(([Map, MapView, Basemap]) => {

            const customBasemap = new Basemap({
                baseLayers: [
                    vectorLayer
                ]
            });

            const map = new Map({
                basemap: customBasemap
            });

            const view = new MapView({
                container: "container",
                map: map,
                center: [-98.53, 39.50], // center of USA
                zoom: 4
            });
        });
    });


// loadModules([
//     "esri/Map",
//     "esri/views/MapView",
//     "esri/Basemap",
//     "esri/layers/VectorTileLayer"
// ])
// .then(([Map, MapView, Basemap]) => {
//     grayLayer().then(it => console.log(it));

//     const customBasemap = new Basemap({
//         baseLayers: [
//             grayLayer()
//         ]
//     });

//     const map = new Map({
//         basemap: customBasemap
//     });

//     const view = new MapView({
//         container: "container",
//         map: map,
//         center: [-98.53, 39.50], // center of USA
//         zoom: 5.5
//     })
// })
// .catch(err => {
//     console.log("error with maps: ", err);
// });