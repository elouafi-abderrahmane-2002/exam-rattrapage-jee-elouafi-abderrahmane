import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CreditService } from 'app/credit/credit.service';
import { CreditDTO } from 'app/credit/credit.model';


@Component({
  selector: 'app-credit-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './credit-list.component.html'})
export class CreditListComponent implements OnInit, OnDestroy {

  creditService = inject(CreditService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  credits?: CreditDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@credit.delete.success:Credit was removed successfully.`,
      'credit.creditPersonnel.credit.referenced': $localize`:@@credit.creditPersonnel.credit.referenced:This entity is still referenced by Credit Personnel ${details?.id} via field Credit.`,
      'credit.creditProfessionnel.credit.referenced': $localize`:@@credit.creditProfessionnel.credit.referenced:This entity is still referenced by Credit Professionnel ${details?.id} via field Credit.`,
      'credit.remboursement.credit.referenced': $localize`:@@credit.remboursement.credit.referenced:This entity is still referenced by Remboursement ${details?.id} via field Credit.`,
      'credit.creditImmobilier.credit.referenced': $localize`:@@credit.creditImmobilier.credit.referenced:This entity is still referenced by Credit Immobilier ${details?.id} via field Credit.`
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
    this.creditService.getAllCredits()
        .subscribe({
          next: (data) => this.credits = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.creditService.deleteCredit(id)
        .subscribe({
          next: () => this.router.navigate(['/credits'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/credits'], {
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
