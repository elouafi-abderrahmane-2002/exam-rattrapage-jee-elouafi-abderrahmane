import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CreditService } from 'app/credit/credit.service';
import { CreditDTO } from 'app/credit/credit.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric } from 'app/common/utils';


@Component({
  selector: 'app-credit-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './credit-add.component.html'
})
export class CreditAddComponent implements OnInit {

  creditService = inject(CreditService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  clientValues?: Map<number,string>;

  addForm = new FormGroup({
    dateDemande: new FormControl(null, [Validators.required]),
    statut: new FormControl(null),
    dateAcceptation: new FormControl(null),
    montant: new FormControl(null, [Validators.required, validNumeric(17, 2)]),
    dureeRemboursement: new FormControl(null, [Validators.required]),
    tauxInteret: new FormControl(null, [Validators.required, validNumeric(7, 2)]),
    typeCredit: new FormControl(null, [Validators.required]),
    client: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@credit.create.success:Credit was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.creditService.getClientValues()
        .subscribe({
          next: (data) => this.clientValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new CreditDTO(this.addForm.value);
    this.creditService.createCredit(data)
        .subscribe({
          next: () => this.router.navigate(['/credits'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
