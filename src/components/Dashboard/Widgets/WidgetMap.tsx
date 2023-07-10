// @ts-ignore
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps"
import Tooltip from "@mui/material/Tooltip";
import {memo} from "react";

const geoUrl = "./world.json"



const WidgetMap = () => {
    
    const countryVisited = ['FRA', 'ITA', 'GBR', 'NLD']

    const getCountryColor = (code: string) => {
        return countryVisited.includes(code) ? "#FC8D59" : "#93B7BE";
    }
    
    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={{
                scale: 125,
                rotation: [-10, 0, 0],
                center: [5, 15]
            }}
            width="900"
            height="400"
        >
            <ZoomableGroup zoom={1}>
                <Geographies
                    geography={geoUrl}>
                    {  // @ts-ignore
                        ({geographies}) =>
                            // @ts-ignore
                            geographies.map((geo) => (
                                // eslint-disable-next-line react/jsx-key
                                <Tooltip title={geo.properties.name} followCursor>
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        stroke="#FFF"
                                        strokeWidth={1}
                                        style={{
                                            default: {
                                                fill: getCountryColor(geo.id),
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: "#656666",
                                                outline: 'none',
                                            },
                                        }}
                                        onClick={() => console.log(geo)}
                                    />
                                </Tooltip>
                            ))
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}

export default memo(WidgetMap)
