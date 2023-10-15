import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from '../../../../core/services/clients.service';
import { Client } from '../../../../../../model/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  client!: Client;
  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientsService: ClientsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.client = this.data.client;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.clientsService.deleteClient(this.client.id).subscribe(() => {
      this.dialogRef.close(), this.router.navigate(['/clients']);
    });
  }
}
