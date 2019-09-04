// create own basemap
// https://www.esri.com/arcgis-blog/products/developers/mapping/design-custom-basemaps-with-the-new-arcgis-vector-tile-style-editor/
// vector tile layer from json : https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer-json/index.html

// creating symbols https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/take-advantage-of-the-javascript-symbol-playground/?rmedium=redirect&rsource=blogs.esri.com/esri/arcgis/2017/03/28/take-advantage-of-the-javascript-symbol-playground

import { loadModules } from "esri-loader";
import grayLayer from "../basemaps/layers/gray-base-layer";

grayLayer()
    .then((vectorLayer) => {
        loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/Basemap",
            "esri/layers/VectorTileLayer",
            "esri/Graphic",
            "esri/layers/GraphicsLayer"
        ])
        .then(([EsriMap, MapView, Basemap, Graphic, GraphicsLayer]) => {

            const customBasemap = new Basemap({
                baseLayers: [
                    vectorLayer
                ]
            });

            const map = new EsriMap({
                basemap: customBasemap
            });

            const view = new MapView({
                container: "container",
                map: map,
                center: [-98.53, 39.50], // center of USA
                zoom: 4
            });

            const graphicsLayer = new GraphicsLayer({
                graphics: []
            })

            const capitals = new Map([
                 ["Austin, Texas", { longitude: -97.7431, latitude: 30.2672 }],
                 ["Boston, Massachusetts", { longitude: -71.0589, latitude: 42.3601}],
                 ["Olympia, Washington", { longitude: -122.9007, latitude: 47.0379 }]
            ]);

            console.log(capitals);
            // #00FFFF = aqua
            for (let location of capitals.values()) {
                console.log(location);
                const pointGraphic = new Graphic({
                    geometry: { type: "point", longitude: location.longitude, latitude: location.latitude },
                    symbol: {
                        type: "simple-marker",
                        color: "#00FFFF",
                        outline: {
                            color: "#FFFFFF",
                            width: 1
                        }
                    },
                    popupTemplate: {
                        title: "city state"
                    }
                });

                graphicsLayer.add(pointGraphic);
            }

            map.layers.add(graphicsLayer);
        }).then((view) => {
            
        });
    });
    