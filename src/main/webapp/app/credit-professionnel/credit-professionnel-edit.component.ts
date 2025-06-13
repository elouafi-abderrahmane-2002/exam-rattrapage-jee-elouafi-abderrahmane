import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CreditProfessionnelService } from 'app/credit-professionnel/credit-professionnel.service';
import { CreditProfessionnelDTO } from 'app/credit-professionnel/credit-professionnel.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-credit-professionnel-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './credit-professionnel-edit.component.html'
})
export class CreditProfessionnelEditComponent implements OnInit {

  creditProfessionnelService = inject(CreditProfessionnelService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  creditValues?: Map<number,string>;
  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    raisonSociale: new FormControl(null, [Validators.maxLength(255)]),
    motif: new FormControl(null, [Validators.maxLength(255)]),
    credit: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@creditProfessionnel.update.success:Credit Professionnel was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
    this.creditProfessionnelService.getCreditValues()
        .subscribe({
          next: (data) => this.creditValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.creditProfessionnelService.getCreditProfessionnel(this.currentId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new CreditProfessionnelDTO(this.editForm.value);
    this.creditProfessionnelService.updateCreditProfessionnel(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/creditProfessionnels'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
