import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ClientService } from 'app/client/client.service';
import { ClientDTO } from 'app/client/client.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-client-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './client-add.component.html'
})
export class ClientAddComponent {

  clientService = inject(ClientService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    nom: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    email: new FormControl(null, [Validators.required, Validators.maxLength(100)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@client.create.success:Client was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ClientDTO(this.addForm.value);
    this.clientService.createClient(data)
        .subscribe({
          next: () => this.router.navigate(['/clients'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
