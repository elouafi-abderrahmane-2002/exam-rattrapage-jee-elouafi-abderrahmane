import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CreditImmobilierService } from 'app/credit-immobilier/credit-immobilier.service';
import { CreditImmobilierDTO } from 'app/credit-immobilier/credit-immobilier.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-credit-immobilier-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './credit-immobilier-add.component.html'
})
export class CreditImmobilierAddComponent implements OnInit {

  creditImmobilierService = inject(CreditImmobilierService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  creditValues?: Map<number,string>;

  addForm = new FormGroup({
    type: new FormControl(null),
    credit: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@creditImmobilier.create.success:Credit Immobilier was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.creditImmobilierService.getCreditValues()
        .subscribe({
          next: (data) => this.creditValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new CreditImmobilierDTO(this.addForm.value);
    this.creditImmobilierService.createCreditImmobilier(data)
        .subscribe({
          next: () => this.router.navigate(['/creditImmobiliers'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
