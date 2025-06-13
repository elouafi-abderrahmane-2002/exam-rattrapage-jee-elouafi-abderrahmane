import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { RemboursementService } from 'app/remboursement/remboursement.service';
import { RemboursementDTO } from 'app/remboursement/remboursement.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric } from 'app/common/utils';


@Component({
  selector: 'app-remboursement-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './remboursement-add.component.html'
})
export class RemboursementAddComponent implements OnInit {

  remboursementService = inject(RemboursementService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  creditValues?: Map<number,string>;

  addForm = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    montant: new FormControl(null, [Validators.required, validNumeric(17, 2)]),
    type: new FormControl(null),
    credit: new FormControl(null, [Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@remboursement.create.success:Remboursement was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.remboursementService.getCreditValues()
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
    const data = new RemboursementDTO(this.addForm.value);
    this.remboursementService.createRemboursement(data)
        .subscribe({
          next: () => this.router.navigate(['/remboursements'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
