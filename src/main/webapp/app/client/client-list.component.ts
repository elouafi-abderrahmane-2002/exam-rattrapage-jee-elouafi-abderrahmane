import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ClientService } from 'app/client/client.service';
import { ClientDTO } from 'app/client/client.model';


@Component({
  selector: 'app-client-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './client-list.component.html'})
export class ClientListComponent implements OnInit, OnDestroy {

  clientService = inject(ClientService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  clients?: ClientDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@client.delete.success:Client was removed successfully.`,
      'client.credit.client.referenced': $localize`:@@client.credit.client.referenced:This entity is still referenced by Credit ${details?.id} via field Client.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.clientService.getAllClients()
        .subscribe({
          next: (data) => this.clients = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.clientService.deleteClient(id)
        .subscribe({
          next: () => this.router.navigate(['/clients'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/clients'], {
                state: {
                  msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                }
              });
              return;
            }
            this.errorHandler.handleServerError(error.error)
          }
        });
  }

}
