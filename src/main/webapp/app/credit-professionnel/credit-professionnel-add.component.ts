import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CreditProfessionnelService } from 'app/credit-professionnel/credit-professionnel.service';
import { CreditProfessionnelDTO } from 'app/credit-professionnel/credit-professionnel.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-credit-professionnel-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './credit-professionnel-add.component.html'
})
export class CreditProfessionnelAddComponent implements OnInit {

  creditProfessionnelService = inject(CreditProfessionnelService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  creditValues?: Map<number,string>;

  addForm = new FormGroup({
    raisonSociale: new FormControl(null, [Validators.maxLength(255)]),
    motif: new FormControl(null, [Validators.maxLength(255)]),
    credit: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@creditProfessionnel.create.success:Credit Professionnel was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.creditProfessionnelService.getCreditValues()
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
    const data = new CreditProfessionnelDTO(this.addForm.value);
    this.creditProfessionnelService.createCreditProfessionnel(data)
        .subscribe({
          next: () => this.router.navigate(['/creditProfessionnels'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
