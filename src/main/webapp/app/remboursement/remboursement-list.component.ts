import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { RemboursementService } from 'app/remboursement/remboursement.service';
import { RemboursementDTO } from 'app/remboursement/remboursement.model';


@Component({
  selector: 'app-remboursement-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './remboursement-list.component.html'})
export class RemboursementListComponent implements OnInit, OnDestroy {

  remboursementService = inject(RemboursementService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  remboursements?: RemboursementDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@remboursement.delete.success:Remboursement was removed successfully.`    };
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
    this.remboursementService.getAllRemboursements()
        .subscribe({
          next: (data) => this.remboursements = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.remboursementService.deleteRemboursement(id)
        .subscribe({
          next: () => this.router.navigate(['/remboursements'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
