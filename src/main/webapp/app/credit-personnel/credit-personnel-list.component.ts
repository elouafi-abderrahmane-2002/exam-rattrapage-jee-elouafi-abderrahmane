import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CreditPersonnelService } from 'app/credit-personnel/credit-personnel.service';
import { CreditPersonnelDTO } from 'app/credit-personnel/credit-personnel.model';


@Component({
  selector: 'app-credit-personnel-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './credit-personnel-list.component.html'})
export class CreditPersonnelListComponent implements OnInit, OnDestroy {

  creditPersonnelService = inject(CreditPersonnelService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  creditPersonnels?: CreditPersonnelDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@creditPersonnel.delete.success:Credit Personnel was removed successfully.`    };
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
    this.creditPersonnelService.getAllCreditPersonnels()
        .subscribe({
          next: (data) => this.creditPersonnels = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.creditPersonnelService.deleteCreditPersonnel(id)
        .subscribe({
          next: () => this.router.navigate(['/creditPersonnels'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
