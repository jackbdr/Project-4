{
    "version": 8,
    "name": "Bubble",
    "metadata": {
        "mapbox:autocomposite": true,
        "mapbox:type": "template",
        "mapbox:sdk-support": {
            "android": "9.3.0",
            "ios": "5.10.0",
            "js": "2.0.0"
        },
        "mapbox:groups": {
            "Land, water, & sky, land": {
                "name": "Land, water, & sky, land",
                "collapsed": true
            },
            "Land, water, & sky, water": {
                "name": "Land, water, & sky, water",
                "collapsed": true
            },
            "Land, water, & sky, built": {
                "name": "Land, water, & sky, built",
                "collapsed": true
            },
            "75556010f6ccca85070926fb60dab622": {
                "name": "Bathymetry",
                "collapsed": true
            },
            "85556e260d95f57c7b8108adcae37edf": {
                "name": "Grass",
                "collapsed": true
            },
            "04309c604b4c3cb8c8e6cbc3bcdcf6be": {
                "name": "Terrain",
                "collapsed": true
            },
            "Land, water, & sky, sky": {"name": "Land, water, & sky, sky"}
        },
        "mapbox:uiParadigm": "layers",
        "mapbox:print": {
            "units": "in",
            "width": "16",
            "height": "8.5",
            "resolution": 300,
            "format": "png"
        },
        "mapbox:trackposition": false,
        "mapbox:decompiler": {
            "id": "cksysy2nl62zp17quosctdtcc",
            "strata": [
                {
                    "id": "ckmnp7wfa2b2v17mnv57m2yxp",
                    "order": [
                        ["land-and-water", "land"],
                        ["land-and-water", "water"],
                        ["land-and-water", "built"],
                        ["land-and-water", "sky"],
                        "bathymetry-10m-200-2u6rh1",
                        "bathymetry-10m-1000-39p8w1",
                        "bathymetry-10m-2000-5i8frv",
                        "bathymetry-10m-3000-93d4x4",
                        "bathymetry-10m-4000-4agrn4",
                        "bathymetry-10m-5000-2oopvl",
                        "bathymetry-10m-6000-0olg6d",
                        "grass",
                        "contour",
                        "mapbox-terrain-rgb"
                    ]
                }
            ],
            "overrides": {
                "land-and-water": {
                    "national-park": {"layout": {"visibility": "none"}},
                    "landcover": {
                        "paint": {
                            "fill-color": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                0,
                                "hsla(107, 52%, 48%, 0.4)",
                                9,
                                "hsla(68, 52%, 48%, 0.1)",
                                9.01,
                                "hsla(68, 52%, 48%, 0)"
                            ],
                            "fill-opacity": [
                                "interpolate",
                                ["exponential", 1.5],
                                ["zoom"],
                                2,
                                0.3,
                                7,
                                0
                            ]
                        },
                        "layout": {"visibility": "none"}
                    },
                    "land-structure-line": {"layout": {"visibility": "none"}},
                    "waterway-shadow": {"layout": {"visibility": "none"}},
                    "water-shadow": {"layout": {"visibility": "none"}},
                    "waterway": {"layout": {"visibility": "none"}},
                    "landuse": {"layout": {"visibility": "none"}},
                    "land-structure-polygon": {"layout": {"visibility": "none"}}
                }
            },
            "components": {"land-and-water": "11.0.0"},
            "propConfig": {
                "land-and-water": {
                    "land": "Simple",
                    "color-base": "#f7f5f2",
                    "color-water": "#dbf3fa",
                    "waterStyle": "Simple",
                    "transitionLandOnZoom": false
                }
            }
        }
    },
    "center": [86.34, 27.21],
    "zoom": 9.6,
    "bearing": 0,
    "pitch": 2,
    "sources": {
        "mapbox://mapbox.terrain-rgb": {
            "url": "mapbox://mapbox.terrain-rgb",
            "type": "raster-dem",
            "tileSize": 256
        },
        "composite": {
            "url": "mapbox://mapbox.0us8t516,mapbox.8j5f01yf,mapbox.mapbox-streets-v8,mapbox.8mhfm0w6,mapbox.ccz72v66,mapbox.82scr8yk,mapbox.137e7iza,mapbox.mapbox-terrain-v2,mapbox.25xhlmby",
            "type": "vector"
        }
    },
    "sprite": "mapbox://sprites/jackbdr/cl4cypbf6000t15mk3jy6tx18/ck2u8j60r58fu0sgyxrigm3cu",
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "land",
            "type": "background",
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, land"
            },
            "layout": {},
            "paint": {"background-color": "rgb(240, 236, 230)"}
        },
        {
            "id": "waterway",
            "type": "line",
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, water"
            },
            "source": "composite",
            "source-layer": "waterway",
            "minzoom": 8,
            "layout": {
                "line-cap": ["step", ["zoom"], "butt", 11, "round"],
                "line-join": "round",
                "visibility": "none"
            },
            "paint": {
                "line-color": "#dbf3fa",
                "line-width": [
                    "interpolate",
                    ["exponential", 1.3],
                    ["zoom"],
                    9,
                    ["match", ["get", "class"], ["canal", "river"], 0.1, 0],
                    20,
                    ["match", ["get", "class"], ["canal", "river"], 8, 3]
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8,
                    0,
                    8.5,
                    1
                ]
            }
        },
        {
            "id": "water",
            "type": "fill",
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, water"
            },
            "source": "composite",
            "source-layer": "water",
            "layout": {},
            "paint": {"fill-color": "#dbf3fa"}
        },
        {
            "id": "land-structure-polygon",
            "type": "fill",
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, built"
            },
            "source": "composite",
            "source-layer": "structure",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["geometry-type"], "Polygon"],
                ["==", ["get", "class"], "land"]
            ],
            "layout": {"visibility": "none"},
            "paint": {"fill-color": "rgb(240, 236, 230)"}
        },
        {
            "id": "land-structure-line",
            "type": "line",
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, built"
            },
            "source": "composite",
            "source-layer": "structure",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["geometry-type"], "LineString"],
                ["==", ["get", "class"], "land"]
            ],
            "layout": {"line-cap": "round", "visibility": "none"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.99],
                    ["zoom"],
                    14,
                    0.75,
                    20,
                    40
                ],
                "line-color": "rgb(240, 236, 230)"
            }
        },
        {
            "id": "bathymetry-10m-200-2u6rh1",
            "type": "fill",
            "metadata": {"mapbox:group": "75556010f6ccca85070926fb60dab622"},
            "source": "composite",
            "source-layer": "bathymetry_10m_200-2u6rh1",
            "layout": {},
            "paint": {"fill-color": "#dbf3fa"}
        },
        {
            "id": "bathymetry-10m-1000-39p8w1",
            "type": "fill",
            "metadata": {"mapbox:group": "75556010f6ccca85070926fb60dab622"},
            "source": "composite",
            "source-layer": "bathymetry_10m_1000-39p8w1",
            "layout": {},
            "paint": {"fill-color": "hsla(195, 77%, 85%, 0.4)"}
        },
        {
            "id": "bathymetry-10m-2000-5i8frv",
            "type": "fill",
            "metadata": {"mapbox:group": "75556010f6ccca85070926fb60dab622"},
            "source": "composite",
            "source-layer": "bathymetry_10m_2000-5i8frv",
            "layout": {},
            "paint": {"fill-color": "hsla(197, 78%, 71%, 0.5)"}
        },
        {
            "id": "bathymetry-10m-3000-93d4x4",
            "type": "fill",
            "metadata": {"mapbox:group": "75556010f6ccca85070926fb60dab622"},
            "source": "composite",
            "source-layer": "bathymetry_10m_3000-93d4x4",
            "layout": {},
            "paint": {"fill-color": "hsla(198, 76%, 59%, 0.6)"}
        },
        {
            "id": "bathymetry-10m-4000-4agrn4",
            "type": "fill",
            "metadata": {"mapbox:group": "75556010f6ccca85070926fb60dab622"},
            "source": "composite",
            "source-layer": "bathymetry_10m_4000-4agrn4",
            "layout": {},
            "paint": {"fill-color": "hsla(198, 76%, 59%, 0.7)"}
        },
        {
            "id": "bathymetry-10m-5000-2oopvl",
            "type": "fill",
            "metadata": {"mapbox:group": "75556010f6ccca85070926fb60dab622"},
            "source": "composite",
            "source-layer": "bathymetry_10m_5000-2oopvl",
            "layout": {},
            "paint": {"fill-color": "hsla(198, 76%, 59%, 0.8)"}
        },
        {
            "id": "bathymetry-10m-6000-0olg6d",
            "type": "fill",
            "metadata": {"mapbox:group": "75556010f6ccca85070926fb60dab622"},
            "source": "composite",
            "source-layer": "bathymetry_10m_6000-0olg6d",
            "layout": {},
            "paint": {"fill-color": "hsl(198, 76%, 59%)"}
        },
        {
            "id": "grass",
            "type": "fill",
            "metadata": {"mapbox:group": "85556e260d95f57c7b8108adcae37edf"},
            "source": "composite",
            "source-layer": "landcover",
            "filter": ["match", ["get", "class"], ["grass"], true, false],
            "paint": {
                "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    "hsl(111, 48%, 48%)",
                    9,
                    "hsl(68, 52%, 48%)"
                ],
                "fill-antialias": false,
                "fill-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    ["match", ["get", "class"], ["grass"], 0.4, 0],
                    9,
                    ["match", ["get", "class"], ["grass"], 0.1, 0],
                    9.1,
                    0
                ]
            }
        },
        {
            "id": "contour",
            "type": "fill",
            "metadata": {"mapbox:group": "04309c604b4c3cb8c8e6cbc3bcdcf6be"},
            "source": "composite",
            "source-layer": "contour",
            "filter": [">=", ["get", "ele"], 0],
            "layout": {},
            "paint": {
                "fill-color": [
                    "interpolate",
                    ["cubic-bezier", 0.5, 1, 1, 1],
                    ["get", "ele"],
                    0,
                    "#9fbbd6",
                    200,
                    "#a6d2d9",
                    400,
                    "#b0ded4",
                    800,
                    "#fedfb4",
                    1600,
                    "#fdb863",
                    3600,
                    "#ffffbd",
                    4000,
                    "#d7d9ea",
                    4400,
                    "#b3acd2",
                    5200,
                    "#ffffff"
                ]
            }
        },
        {
            "id": "mapbox-terrain-rgb",
            "type": "hillshade",
            "metadata": {"mapbox:group": "04309c604b4c3cb8c8e6cbc3bcdcf6be"},
            "source": "mapbox://mapbox.terrain-rgb",
            "layout": {},
            "paint": {
                "hillshade-shadow-color": [
                    "step",
                    ["zoom"],
                    "hsl(304, 2%, 41%)",
                    9,
                    "hsla(304, 97%, 9%, 0.9)"
                ],
                "hillshade-highlight-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8.99,
                    "hsl(306, 0%, 100%)",
                    9,
                    "hsla(306, 97%, 86%, 0.7)"
                ],
                "hillshade-accent-color": "#ffffff",
                "hillshade-exaggeration": 0.7
            }
        }
    ],
    "created": "2022-06-13T16:40:57.647Z",
    "modified": "2022-06-13T16:40:57.647Z",
    "id": "cl4cypbf6000t15mk3jy6tx18",
    "owner": "jackbdr",
    "visibility": "private",
    "protected": false,
    "draft": false
}