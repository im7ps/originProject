import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enviroment } from '../../assets/enviroment';

@Injectable({ providedIn: 'root' })
export class AIService {
  private _aiResponse = new BehaviorSubject<string>('');
  aiResponse$ = this._aiResponse.asObservable();

  private readonly GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
  private readonly API_KEY = new Enviroment().getApiKey();

  constructor(private http: HttpClient) {}

  askAI(prompt: string): string {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };

    this.http.post(`${this.GEMINI_URL}?key=${this.API_KEY}`, body, { headers }).subscribe({
      next: (response: any) => {
        const message = response.candidates?.[0]?.content?.parts?.[0]?.text || 'Nessuna risposta';
		return(this._aiResponse.next(message));
      },
      error: (err) => {
		return ( this._aiResponse.next(`Errore: ${err.error?.error?.message || err.message}`));
      },
    });
	return '';
  }
}