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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuider: NonNullableFormBuilder,
    private location: Location,
    private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];
    this.form = this.formBuider.group({
      id: [product.id],
      code: [product.code, [Validators.maxLength(50), Validators.required]],
      name: [product.name, [Validators.maxLength(100), Validators.required]],
      price: [
        product.price,
        [Validators.min(0.0), Validators.max(10000.00), Validators.required],
      ],
      quantity: [
        product.quantity,
        [Validators.min(0), Validators.max(10000), Validators.required],
      ],
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName) as FormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl): string {
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }

    if (field?.hasError('minlength') && field.errors) {
      const minRequiredLength = field.errors['minlength']['requiredLength'];
      return `Este campo deve conter no mínimo ${minRequiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength') && field.errors) {
      const maxRequiredLength = field.errors['maxlength']['requiredLength'];
      return `Este campo deve conter no máximo ${maxRequiredLength} caracteres.`;
    }

    if (field?.hasError('min') && field.errors) {
      const minRequiredLength = field.errors['min']['min'];
      return `Este campo deve conter o valor de no mínimo ${minRequiredLength}.`;
    }

    if (field?.hasError('max') && field.errors) {
      const minRequiredLength = field.errors['max']['max'];
      return `Este campo deve conter o valor de no máximo ${minRequiredLength}.`;
    }

    return field['errors']? 'Campo inválido' : '';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.productService.saveProduct(this.form.value as Product).subscribe({
        next: () => this.onSuccess(),
        error: (err) => console.log(err),
      });
    }
  }

  onSuccess(): void {
    this.snackBar.open('Produto salvo com sucesso.', 'Ok', {duration: 5000});
    this.onCancel();
  }

  onCancel(): void {
    this.location.back();
  }
}
