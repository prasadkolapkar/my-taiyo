
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import LineChart from '../shared/components/LineChart';
import MapChart from '../shared/components/MapChart';
import CovidService from '../services/covid19-data-services';
import { ICovid19Cases, ICovid19CountryWise } from '../models/covid19-model';
import { useQuery } from 'react-query';


export default function MapCharts() {
  const covidService = new CovidService();
  const [data, setData] = useState<any>({
    x: [],
    y: [],
  });
  const [mapData, setMapData] = useState<any[]>([]);

  // const { data: allData, isLoading: isAllDataLoading, error: allDataError } = useQuery<ICovid19Cases>('allData', covidService.getAllData);

  // const { data: countryData, isLoading: isCountryDataLoading, error: countryDataError } = useQuery<ICovid19CountryWise[]>('countryData', covidService.getCountryData);

  const buildXY = (res: any) => {
    const updatedData = {
      x: ['Total Cases', 'Today Cases', 'Total Deaths', 'Today Deaths', 'Total Recovered', 'Today Recovered', 'Active', 'Critical'],
      y: [
        res.cases,
        res.todayCases,
        res.deaths,
        res.todayDeaths,
        res.recovered,
        res.todayRecovered,
        res.active,
        res.critical
      ],
    };
    setData(updatedData);
  }

  const fetchData = async () => {
    try {
      const allData = await covidService.getAllData();
      const countryData = await covidService.getCountryData();
      buildXY(allData);
      setMapData(countryData);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem><a href="/">Overview</a></BreadcrumbItem>
        <BreadcrumbItem active>Map & Charts</BreadcrumbItem>
      </Breadcrumb>
      <div className='w-full'>
        <div className="flex items-center justify-between bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">Map & Charts</h1>
        </div>
        <div className='p-8'>
          {
            !!data ?
              <LineChart data={data} xAxisTitle="Categories" yAxisTitle="Count" title="COVID-19 Statistics" /> : "Loading..."
          }
        </div>
        <div className='p-8'>
          {
            !!mapData ?
              <MapChart data={mapData} title="Country Wise Data" /> : "Loading..."
          }
        </div>
      </div>
    </React.Fragment>
  )
}
