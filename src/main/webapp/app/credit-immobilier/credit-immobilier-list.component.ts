import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CreditImmobilierService } from 'app/credit-immobilier/credit-immobilier.service';
import { CreditImmobilierDTO } from 'app/credit-immobilier/credit-immobilier.model';


@Component({
  selector: 'app-credit-immobilier-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './credit-immobilier-list.component.html'})
export class CreditImmobilierListComponent implements OnInit, OnDestroy {

  creditImmobilierService = inject(CreditImmobilierService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  creditImmobiliers?: CreditImmobilierDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@creditImmobilier.delete.success:Credit Immobilier was removed successfully.`    };
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
    this.creditImmobilierService.getAllCreditImmobiliers()
        .subscribe({
          next: (data) => this.creditImmobiliers = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.creditImmobilierService.deleteCreditImmobilier(id)
        .subscribe({
          next: () => this.router.navigate(['/creditImmobiliers'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
