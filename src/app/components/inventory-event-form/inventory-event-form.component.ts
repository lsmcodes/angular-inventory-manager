import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from '../../model/product';
import { InventoryEventService } from '../../services/inventory-event.service';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-inventory-event-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inventory-event-form.component.html',
  styleUrl: './inventory-event-form.component.scss',
})
export class InventoryEventFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private formBuilder: NonNullableFormBuilder,
    private inventoryEventService: InventoryEventService,
    private location: Location,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      eventType: ['', [Validators.required]],
      productCode: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let product: Product | null = null;

      this.productService
        .getProductByCode(this.form.get('productCode')?.value)
        .subscribe({
          next: (foundProduct) => {
            product = foundProduct;
            if (product) {
              const { productCode, ...eventData } = this.form.value;
              this.inventoryEventService
                .createInventoryEvent(eventData, product.id)
                .subscribe(() => this.onSuccess());
            }
          },
          error: (err) => this.dialog.open(ErrorDialogComponent, {data: 'Erro ao salvar movimentação'}),
        });
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName) as FormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl): string {
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }

    if (field?.hasError('min') && field.errors) {
      const minRequiredLength = field.errors['min']['min'];
      return `Este campo deve conter o valor de no mínimo ${minRequiredLength}.`;
    }

    return field['errors']? 'Campo inválido' : '';
  }

  onSuccess(): void {
    this.snackBar.open('Movimentação salva com sucesso.', 'Ok', {
      duration: 5000,
    });
    this.onCancel();
  }

  onCancel(): void {
    this.location.back();
  }
}
