// create own basemap
// https://www.esri.com/arcgis-blog/products/developers/mapping/design-custom-basemaps-with-the-new-arcgis-vector-tile-style-editor/
// vector tile layer from json : https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer-json/index.html

// creating symbols https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/take-advantage-of-the-javascript-symbol-playground/?rmedium=redirect&rsource=blogs.esri.com/esri/arcgis/2017/03/28/take-advantage-of-the-javascript-symbol-playground

// intro to graphics https://developers.arcgis.com/javascript/latest/sample-code/intro-graphics/index.html

// custom widgets https://developers.arcgis.com/javascript/latest/sample-code/widgets-custom-widget/index.html#3
// custom widget with vue https://developers.arcgis.com/javascript/latest/sample-code/widgets-frameworks-vue/index.html
// more with react https://developers.arcgis.com/javascript/latest/sample-code/widgets-frameworks-react/index.html

import { setDefaultOptions, loadModules } from "esri-loader";
// import grayLayer from "../basemaps/layers/gray-base-layer";
import layerStyle from "../basemaps/resources/gray-basemap-style";
// import { FieldsContent } from "esri/popup/content";

setDefaultOptions({ css: true });

type MapModules = [
    typeof import("esri/Map"), 
    typeof import("esri/views/MapView"), 
    typeof import("esri/Basemap"), 
    typeof import("esri/layers/VectorTileLayer"), 
    typeof import("esri/Graphic"), 
    typeof import("esri/layers/GraphicsLayer"),
    typeof import("esri/geometry/Point"),
    typeof import("esri/symbols/SimpleMarkerSymbol"),
    typeof import("esri/PopupTemplate"),
    typeof import("esri/popup/content/FieldsContent"),
    typeof import("esri/popup/FieldInfo")
];

(loadModules([
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/layers/VectorTileLayer",
    "esri/Graphic",
    "esri/layers/FeatureLayer",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/PopupTemplate",
    "esri/popup/content/FieldsContent",
    "esri/popup/FieldInfo"
]) as Promise<MapModules>)
.then(([EsriMap, MapView, Basemap, VectorTileLayer, Graphic, FeatureLayer, Point, SMP, PopupTemplate, FieldsContent, FieldInfo]) => {

    const customBasemap = new Basemap({
        baseLayers: [
            // vectorLayer
            new VectorTileLayer({
                style: layerStyle
            })
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

    /* 
    GraphicsLayer vs FeatureLayer - https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html

    Unlike FeatureLayer and MapImageLayer, a GraphicsLayer has no schema. 
    Therefore, the graphics that compose a GraphicsLayer may be of more than one geometry type (either points, lines, or polygons). 
    Each graphic must have its own symbol since the GraphicsLayer cannot have an associated renderer. 
    Graphics may also contain different attribute schema from one another.
    */

    const capitals = new Map([
            ["Austin, Texas", { longitude: -97.7431, latitude: 30.2672 }],
            ["Boston, Massachusetts", { longitude: -71.0589, latitude: 42.3601}],
            ["Olympia, Washington", { longitude: -122.9007, latitude: 47.0379 }]
    ]);


    let graphics: __esri.Graphic[] = [];
    for (let [capital, location] of capitals.entries()) {
        graphics.push(new Graphic({
            geometry: new Point({ 
                longitude: location.longitude,
                latitude: location.latitude,
            }),
            attributes: {
                "cityName": capital
            }
        }));
    }


    console.log(capitals);
    // #00FFFF = aqua

    const points = new FeatureLayer({
        source: graphics,
        geometryType: "point",
        objectIdField: "cityName",
        fields: [{
            name: "cityName",
            type: "string"
        }]
    });

    map.add(points);

    return view;
}).then((view) => {
    return view;
});
