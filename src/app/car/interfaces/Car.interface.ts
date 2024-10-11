// src/app/models.ts

export interface IPivote {
  id: number;
  nombre: string;
}

export interface ICar {
  id: number;
  modelo: string;
  anio: number;
  colorId: number;
  color: IPivote;
  marcaId: number;
  marca: IPivote;
}

export interface IRequestCreateAndUpdateCar {
  id?: number;
  modelo: string;
  anio: number;
  colorId: number;
  marcaId: number;
}
