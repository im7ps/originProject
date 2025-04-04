import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  async getCoordinates(city: string | number | boolean): Promise<{ lat: number; lon: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;

    try {
      const response: any = await firstValueFrom(this.http.get(url));
      if (response.length === 0) return null;

      const lat = parseFloat(response[0].lat);
      const lon = parseFloat(response[0].lon);
      return { lat, lon };
    } catch (error) {
      return null;
    }
  }

  async updateTemperature(latitude: number, longitude: number): Promise<string | null> {
	const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
  
	try {
	  const response: any = await firstValueFrom(this.http.get(apiUrl));
	  const temperature = response.current.temperature_2m;
	  return temperature; // Restituisce la temperatura
	} catch (error) {
	  console.error('Errore durante il recupero della temperatura:', error);
	  return null; // Restituisce null in caso di errore
	}
  }
}