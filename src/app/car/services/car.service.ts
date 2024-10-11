import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar, IPivote, IRequestCreateAndUpdateCar } from '../interfaces/Car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly _baseUrl = 'http://localhost:5110/api'; 
  constructor(private _http: HttpClient) { }

  public getCars(): Observable<ICar[]> {
    return this._http.get<ICar[]>(`${this._baseUrl}/vehiculos`)
  }

  public createCar(car: IRequestCreateAndUpdateCar): Observable<ICar> {
    return this._http.post<ICar>(`${this._baseUrl}/vehiculos`, car)
  }

  public updateCar(car: any): Observable<any> {
    return this._http.put(`${this._baseUrl}/vehiculos/${car.id}`, car)
  }

  public deleteCarById(carId: number): Observable<any> {
    return this._http.delete(`${this._baseUrl}/vehiculos/${carId}`)
  }

  public getPivote(pivote: 'marcas' | 'colores'): Observable<IPivote[]> {
    return this._http.get<IPivote[]>(`${this._baseUrl}/${pivote}`);
  }
}
