import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { CreditPersonnelService } from 'app/credit-personnel/credit-personnel.service';
import { CreditPersonnelDTO } from 'app/credit-personnel/credit-personnel.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-credit-personnel-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './credit-personnel-edit.component.html'
})
export class CreditPersonnelEditComponent implements OnInit {

  creditPersonnelService = inject(CreditPersonnelService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  creditValues?: Map<number,string>;
  currentId?: number;

  editForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    motif: new FormControl(null, [Validators.maxLength(255)]),
    credit: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@creditPersonnel.update.success:Credit Personnel was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentId = +this.route.snapshot.params['id'];
    this.creditPersonnelService.getCreditValues()
        .subscribe({
          next: (data) => this.creditValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.creditPersonnelService.getCreditPersonnel(this.currentId!)
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
    const data = new CreditPersonnelDTO(this.editForm.value);
    this.creditPersonnelService.updateCreditPersonnel(this.currentId!, data)
        .subscribe({
          next: () => this.router.navigate(['/creditPersonnels'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
