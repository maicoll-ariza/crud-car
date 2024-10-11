import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Subscription } from 'rxjs';
import { ICar, IPivote } from '../../interfaces/Car.interface';

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.css'],
})
export class CarPageComponent implements OnInit {
  public formState: FormGroup = this._fb.group({
    id: [],
    marca: [, [Validators.required]],
    modelo: ['', [Validators.required]],
    color: [, [Validators.required]],
    anio: ['', [Validators.required]],
  });

  public isEditing: boolean = false;
  public isDisabled: boolean = false;

  public cars: ICar[] = [];
  public marcas: IPivote[] = [];
  public colors: IPivote[] = [];

  // public carSelected: ICar | null = null;

  private _subscriptionCollection: Subscription[] = [];
  constructor(private _fb: FormBuilder, private _carService: CarService) {}

  ngOnInit(): void {
    this.getAllCars();
    this.getMarcas();
    this.getColores();
  }

  public selectCar(car: ICar): void {
    // this.carSelected = car;
    this.isEditing = true;

    const date = this.formatDate(car.anio);
    this.formState.reset({
      ...car,
      anio: date,
      color: car.colorId,
      marca: car.marcaId,
    });
  }

  public onDeleteCar(idCar: number): void {
    this.deleteCar(idCar);
  }

  public isValidField(field: string): boolean {
    return (
      this.formState.controls[field].touched &&
      this.formState.controls[field].invalid
    );
  }

  public createCar(): void {
    this.isDisabled = true;
    const { id, anio, color, marca, ...rest } = this.formState.value;

    const payload = {
      ...rest,
      anio: Number(anio.split('-')[0]),
      colorId: Number(color),
      marcaId: Number(marca),
    };

    const subscription = this._carService.createCar(payload).subscribe({
      next: (resp) => {
        this.getAllCars();
        this.formState.reset();
        this.isDisabled = false;
      },
      error: (error) => {
        alert('No se pudo crear el carro. Intentelo más tarde');
        this.isDisabled = false;
      },
    });
    this._subscriptionCollection.push(subscription);
  }

  public updateCar(): void {
    this.isDisabled = true;
    const { anio, color, marca, ...rest } = this.formState.value;

    const payload = {
      ...rest,
      anio: Number(anio.split('-')[0]),
      colorId: Number(color),
      marcaId: Number(marca),
    };
    const subscription = this._carService.updateCar(payload).subscribe({
      next: (resp) => {
        this.getAllCars();
        this.formState.reset();
        this.isDisabled = false;
        this.isEditing = false;
      },
      error: (error) => {
        alert('No se pudo editar el carro. Intentelo más tarde');
        this.isDisabled = false;
      },
    });
    this._subscriptionCollection.push(subscription);
  }

  public deleteCar(idCar?: number): void {
    this.isDisabled = true;
    const subscription = this._carService
      .deleteCarById(idCar ? idCar : this.formState.value.id)
      .subscribe({
        next: (resp) => {
          this.getAllCars();
          this.formState.reset();
          this.isEditing = false;
          this.isDisabled = false;
        },
        error: (error) => {
          alert('No se pudo editar el carro. Intentelo más tarde');
          this.isDisabled = false;
        },
      });
    this._subscriptionCollection.push(subscription);
  }

  public onSubmit(): void {
    this.formState.markAllAsTouched();

    if (this.formState.invalid) return;

    this.isEditing ? this.updateCar() : this.createCar();
  }

  public clearOrDeleteCar(): void {
    this.isEditing ? this.deleteCar() : this.resetForm();
  }

  public resetForm(): void {
    this.formState.reset();
    this.isEditing = false;
  }

  private getAllCars(): void {
    const subscription = this._carService.getCars().subscribe({
      next: (resp) => {
        this.cars = resp;
      },
      error: () => {
        alert('Algo salió mal trayendo la información');
      },
    });
    this._subscriptionCollection.push(subscription);
  }

  private getMarcas(): void {
    const subscription = this._carService.getPivote('marcas').subscribe({
      next: (resp) => {
        this.marcas = resp;
      },
    });
    this._subscriptionCollection.push(subscription);
  }

  private getColores(): void {
    const subscription = this._carService.getPivote('colores').subscribe({
      next: (resp) => {
        this.colors = resp;
      },
    });
    this._subscriptionCollection.push(subscription);
  }

  private formatDate(anio: number): string {
    const date = new Date(anio, 0, 1);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
