import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


import { ClientListComponent } from './client/client-list.component';
import { ClientAddComponent } from './client/client-add.component';
import { ClientEditComponent } from './client/client-edit.component';
import { CreditListComponent } from './credit/credit-list.component';
import { CreditAddComponent } from './credit/credit-add.component';
import { CreditEditComponent } from './credit/credit-edit.component';
import { CreditPersonnelListComponent } from './credit-personnel/credit-personnel-list.component';
import { CreditPersonnelAddComponent } from './credit-personnel/credit-personnel-add.component';
import { CreditPersonnelEditComponent } from './credit-personnel/credit-personnel-edit.component';
import { CreditProfessionnelListComponent } from './credit-professionnel/credit-professionnel-list.component';
import { CreditProfessionnelAddComponent } from './credit-professionnel/credit-professionnel-add.component';
import { CreditProfessionnelEditComponent } from './credit-professionnel/credit-professionnel-edit.component';
import { RemboursementListComponent } from './remboursement/remboursement-list.component';
import { RemboursementAddComponent } from './remboursement/remboursement-add.component';
import { RemboursementEditComponent } from './remboursement/remboursement-edit.component';
import { CreditImmobilierListComponent } from './credit-immobilier/credit-immobilier-list.component';
import { CreditImmobilierAddComponent } from './credit-immobilier/credit-immobilier-add.component';
import { CreditImmobilierEditComponent } from './credit-immobilier/credit-immobilier-edit.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: $localize`:@@home.index.headline:Welcome to your new app!`
  },


  {
    path: 'clients',
    component: ClientListComponent,
    title: $localize`:@@client.list.headline:Clients`
  },
  {
    path: 'clients/add',
    component: ClientAddComponent,
    title: $localize`:@@client.add.headline:Add Client`
  },
  {
    path: 'clients/edit/:id',
    component: ClientEditComponent,
    title: $localize`:@@client.edit.headline:Edit Client`
  },
  {
    path: 'credits',
    component: CreditListComponent,
    title: $localize`:@@credit.list.headline:Credits`
  },
  {
    path: 'credits/add',
    component: CreditAddComponent,
    title: $localize`:@@credit.add.headline:Add Credit`
  },
  {
    path: 'credits/edit/:id',
    component: CreditEditComponent,
    title: $localize`:@@credit.edit.headline:Edit Credit`
  },
  {
    path: 'creditPersonnels',
    component: CreditPersonnelListComponent,
    title: $localize`:@@creditPersonnel.list.headline:Credit Personnels`
  },
  {
    path: 'creditPersonnels/add',
    component: CreditPersonnelAddComponent,
    title: $localize`:@@creditPersonnel.add.headline:Add Credit Personnel`
  },
  {
    path: 'creditPersonnels/edit/:id',
    component: CreditPersonnelEditComponent,
    title: $localize`:@@creditPersonnel.edit.headline:Edit Credit Personnel`
  },
  {
    path: 'creditProfessionnels',
    component: CreditProfessionnelListComponent,
    title: $localize`:@@creditProfessionnel.list.headline:Credit Professionnels`
  },
  {
    path: 'creditProfessionnels/add',
    component: CreditProfessionnelAddComponent,
    title: $localize`:@@creditProfessionnel.add.headline:Add Credit Professionnel`
  },
  {
    path: 'creditProfessionnels/edit/:id',
    component: CreditProfessionnelEditComponent,
    title: $localize`:@@creditProfessionnel.edit.headline:Edit Credit Professionnel`
  },
  {
    path: 'remboursements',
    component: RemboursementListComponent,
    title: $localize`:@@remboursement.list.headline:Remboursements`
  },
  {
    path: 'remboursements/add',
    component: RemboursementAddComponent,
    title: $localize`:@@remboursement.add.headline:Add Remboursement`
  },
  {
    path: 'remboursements/edit/:id',
    component: RemboursementEditComponent,
    title: $localize`:@@remboursement.edit.headline:Edit Remboursement`
  },
  {
    path: 'creditImmobiliers',
    component: CreditImmobilierListComponent,
    title: $localize`:@@creditImmobilier.list.headline:Credit Immobiliers`
  },
  {
    path: 'creditImmobiliers/add',
    component: CreditImmobilierAddComponent,
    title: $localize`:@@creditImmobilier.add.headline:Add Credit Immobilier`
  },
  {
    path: 'creditImmobiliers/edit/:id',
    component: CreditImmobilierEditComponent,
    title: $localize`:@@creditImmobilier.edit.headline:Edit Credit Immobilier`
  },
  {
    path: 'error',
    component: ErrorComponent,
    title: $localize`:@@error.page.headline:Error`
  },
  {
    path: '**',
    component: ErrorComponent,
    title: $localize`:@@notFound.headline:Page not found`
  }
];
