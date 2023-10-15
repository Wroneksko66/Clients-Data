import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Client } from '../../../../../model/client.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  client!: Client;
  id!: number;
  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.clientsService.getClient(+params['id'])))
      .subscribe((client) => (this.client = client));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { client: this.client },
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: { client: this.client },
      width: '600px',
    });
  }
}
