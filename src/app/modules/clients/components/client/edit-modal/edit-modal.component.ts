import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../../../model/client.model';
import { ClientsService } from '../../../../core/services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  client!: Client;
  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
  ) {}

  ngOnInit(): void {
    this.client = this.data.client;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
