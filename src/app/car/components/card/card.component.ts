import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICar } from '../../interfaces/Car.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() 
  public car?: ICar;
  @Input()
  public isProcessing: boolean = false;

  @Output() onSelectToEdit = new EventEmitter<ICar>();
  @Output() onDelete = new EventEmitter<number>();

  public onEdit(): void {
    this.onSelectToEdit.emit(this.car);
  }

  public onClickDelete(): void {
    this.onDelete.emit(this.car?.id)
  }




}
