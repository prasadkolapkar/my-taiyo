import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerImage from '../../asset/location-svgrepo-com.svg';
import L from 'leaflet';
interface MapChartProps {
  data: any[];
  title: string
}
const MapChart: React.FC<MapChartProps> = ({
  data,
  title
}) => {

  const customIcon = L.icon({
    iconUrl: markerImage,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    console.log("from child", data)
  })
  return (
    <div>
      <div className="text-4xl font-bold text-center">{title}</div>
      {
        !!data ?
          <>
            <div className='p-8'>

              <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                {
                  data.map((country: any) => (
                    <div>
                      {
                        !!country.countryInfo.lat &&
                        <Marker
                          key={country.countryInfo._id}
                          icon={customIcon}
                          position={[country.countryInfo.lat, country.countryInfo.long]}
                        >
                          <Popup position={[country.countryInfo.lat, country.countryInfo.long]}>

                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6">
                              <div className="flex items-center mb-4">
                                <img
                                  src={country.countryInfo.flag}
                                  alt="Country Icon"
                                  className="w-8 h-8 mr-2"
                                />
                                <h2 className="text-white text-2xl font-bold pt-1">{country.country}</h2>
                              </div>
                              <div className="bg-white rounded-lg p-4">
                                <h3 className="text-xl font-semibold mb-2">Covid 19 Statistics</h3>
                                <p className="text-gray-700 p-0 m-0">Total Cases - {country.cases}
                                </p>
                                <p className="text-gray-700 p-0 m-0">
                                  Todays Cases - {country.todayCases}
                                </p>
                                <p className="text-gray-700 p-0 m-0">
                                  Total Death - {country.deaths}
                                </p>
                                <p className="text-gray-700 p-0 m-0">
                                  Todays Death - {country.todayDeaths}
                                </p>
                                <p className="text-gray-700 p-0 m-0">
                                  Total Recovered - {country.recovered}
                                </p>
                                <p className="text-gray-700 p-0 m-0">
                                  Todays Recovered - {country.todayRecovered}
                                </p>
                                <p className="text-gray-700 p-0 m-0">
                                  Active - {country.active}
                                </p>
                                <p className="text-gray-700 p-0 m-0">
                                  Critical - {country.critical}
                                </p>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      }
                    </div>
                  ))
                }
              </MapContainer>
            </div>
          </> : "Loading..."
      }
    </div>
  );
};

export default MapChart;
