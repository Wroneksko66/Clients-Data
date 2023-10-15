import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { DeleteModalComponent } from './components/client/delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from './components/client/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientsTableComponent,
    ClientComponent,
    ClientFormComponent,
    DeleteModalComponent,
    EditModalComponent,
  ],
  imports: [CommonModule, ClientsRoutingModule, SharedModule, MatDialogModule],
})
export class ClientsModule {}
