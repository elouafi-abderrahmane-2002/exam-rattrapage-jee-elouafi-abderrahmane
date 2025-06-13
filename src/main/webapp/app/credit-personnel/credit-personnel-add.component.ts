import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CreditPersonnelService } from 'app/credit-personnel/credit-personnel.service';
import { CreditPersonnelDTO } from 'app/credit-personnel/credit-personnel.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-credit-personnel-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './credit-personnel-add.component.html'
})
export class CreditPersonnelAddComponent implements OnInit {

  creditPersonnelService = inject(CreditPersonnelService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  creditValues?: Map<number,string>;

  addForm = new FormGroup({
    motif: new FormControl(null, [Validators.maxLength(255)]),
    credit: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@creditPersonnel.create.success:Credit Personnel was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.creditPersonnelService.getCreditValues()
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
    const data = new CreditPersonnelDTO(this.addForm.value);
    this.creditPersonnelService.createCreditPersonnel(data)
        .subscribe({
          next: () => this.router.navigate(['/creditPersonnels'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
