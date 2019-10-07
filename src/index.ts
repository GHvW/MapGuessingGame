// create own basemap
// https://www.esri.com/arcgis-blog/products/developers/mapping/design-custom-basemaps-with-the-new-arcgis-vector-tile-style-editor/
// vector tile layer from json : https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer-json/index.html

// creating symbols https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/take-advantage-of-the-javascript-symbol-playground/?rmedium=redirect&rsource=blogs.esri.com/esri/arcgis/2017/03/28/take-advantage-of-the-javascript-symbol-playground

import { loadModules } from "esri-loader";
import grayLayer from "../basemaps/layers/gray-base-layer";
type MapModules = [typeof import("esri/Map"), 
                   typeof import("esri/views/MapView"), 
                   typeof import("esri/Basemap"), 
                //    typeof import("esri/layers/VectorTileLayer"), 
                   typeof import("esri/Graphic"), 
                   typeof import("esri/layers/GraphicsLayer"),
                   typeof import("esri/geometry/Point"),
                   typeof import("esri/symbols/SimpleMarkerSymbol")];

grayLayer()
    .then((vectorLayer) => {
        (loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/Basemap",
            // "esri/layers/VectorTileLayer",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "esri/geometry/Point",
            "esri/symbols/SimpleMarkerSymbol"
        ]) as Promise<MapModules>)
        .then(([EsriMap, MapView, Basemap, Graphic, GraphicsLayer, Point, SMP]) => {

            const customBasemap = new Basemap({
                baseLayers: [
                    vectorLayer
                ]
            });

            const map = new EsriMap({
                basemap: customBasemap
            });
            console.log("Map", map);

            const view = new MapView({
                container: "container",
                map: map,
                center: [-98.53, 39.50], // center of USA
                zoom: 4
            });

            const graphicsLayer = new GraphicsLayer({
                graphics: []
            });

            console.log("graphics layer", graphicsLayer);

            const capitals = new Map([
                 ["Austin, Texas", { longitude: -97.7431, latitude: 30.2672 }],
                 ["Boston, Massachusetts", { longitude: -71.0589, latitude: 42.3601}],
                 ["Olympia, Washington", { longitude: -122.9007, latitude: 47.0379 }]
            ]);

            console.log(capitals);
            // #00FFFF = aqua
            for (let [name, location] of capitals.entries()) {
                console.log(name, location);
                const pointGraphic = new Graphic({
                    geometry: new Point({ longitude: location.longitude, latitude: location.latitude }),
                    symbol: new SMP({ 
                        color: "#00FFFF",
                        outline: {
                            color: "#C4BEBE",
                            width: 1
                        }
                    }),
                    attributes: {
                        Name: name,
                        Population: "1,000"
                    },
                    popupTemplate: { // autocast to new PopupTemplate ... supposedly
                        title: "{Name}",
                        content: [{
                            type: "fields",
                            fieldInfos: [
                                { fieldName: "Population" }
                            ]
                        }]
                    }
                });

                graphicsLayer.graphics.push(pointGraphic);
            }

            map.add(graphicsLayer);
        }).then((view) => {
            return view;
        });
    });
    