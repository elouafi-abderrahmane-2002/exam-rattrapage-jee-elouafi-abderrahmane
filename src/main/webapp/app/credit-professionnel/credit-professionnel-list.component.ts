import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CreditProfessionnelService } from 'app/credit-professionnel/credit-professionnel.service';
import { CreditProfessionnelDTO } from 'app/credit-professionnel/credit-professionnel.model';


@Component({
  selector: 'app-credit-professionnel-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './credit-professionnel-list.component.html'})
export class CreditProfessionnelListComponent implements OnInit, OnDestroy {

  creditProfessionnelService = inject(CreditProfessionnelService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  creditProfessionnels?: CreditProfessionnelDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@creditProfessionnel.delete.success:Credit Professionnel was removed successfully.`    };
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
    this.creditProfessionnelService.getAllCreditProfessionnels()
        .subscribe({
          next: (data) => this.creditProfessionnels = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.creditProfessionnelService.deleteCreditProfessionnel(id)
        .subscribe({
          next: () => this.router.navigate(['/creditProfessionnels'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
