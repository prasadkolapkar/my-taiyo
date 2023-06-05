import axios from 'axios';
import { ApiRouteKeys } from '../utils/settings';
import { ICovid19Cases, ICovid19CountryWise } from '../models/covid19-model';

class Covid19Service {
  private baseUrl: string;
  constructor() {
    this.baseUrl = 'https://disease.sh/v3/covid-19';
  }

  async getAllData(): Promise<ICovid19Cases> {
    const response = await axios.get<ICovid19Cases>(`${this.baseUrl}/${ApiRouteKeys.ALL}`);
    return response.data;
  }

  async getCountryData(): Promise<ICovid19CountryWise[]> {
    const response = await axios.get<ICovid19CountryWise[]>(`${this.baseUrl}/${ApiRouteKeys.Countries}`);
    return response.data;
  }
}

export default Covid19Service;
