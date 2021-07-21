import {Component, Inject, Input, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {Job} from "../job";
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { EditJobDialogComponent } from './edit-job-dialog.component';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss']
})
export class JobListingComponent implements OnInit {
  @Input() job: Job;
  @Input() employer: boolean;

  constructor(
      private storage: StorageService,
      public dialog: MatDialog,
      ) {}

  ngOnInit(): void {}

  editJob() {
    this.dialog.open(EditJobDialogComponent, {data: this.job}).afterClosed().subscribe(res => {
      window.location.reload()
    })
  }

}
