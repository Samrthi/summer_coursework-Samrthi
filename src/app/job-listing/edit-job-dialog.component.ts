import {Component, Inject, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../storage.service";
import {Job} from "../job";

@Component({
    selector: 'edit-job-dialog',
    templateUrl: 'edit-job-dialog.html',
})
export class EditJobDialogComponent implements OnInit {
    nameControl: FormControl;
    descriptionControl: FormControl;
    skills: string[] = [];
    requiredSkills: string[] = [];
    skillDict = {};
    selected = ""
    allowDelete: boolean = true;
    showDeleteConfirm: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<EditJobDialogComponent>,
        private storage: StorageService,
        @Inject(MAT_DIALOG_DATA) public data: Job,
    ) {
    }

    ngOnInit(): void {
        console.log(this.data)
        this.nameControl = new FormControl(this.data.name)
        this.descriptionControl = new FormControl(this.data.description)
        this.storage.getSkillList().subscribe(skills => {
            skills.forEach(skill => {
                this.skillDict[skill._id] = skill.name
                if (this.data.skills.includes(skill.name)) {
                    this.requiredSkills.push(skill._id)
                } else {
                    this.skills.push(skill._id)
                }
            })
        })
    }

    addSkill(skill_id: string): void {
        this.requiredSkills.push(skill_id)
        const index = this.skills.indexOf(skill_id, 0);
        if (index > -1) {
            this.skills.splice(index, 1);
        }
        this.selected = ""
    }

    removeSkill(skill_id: string): void {
        this.skills.push(skill_id)
        const index = this.requiredSkills.indexOf(skill_id, 0);
        if (index > -1) {
            this.requiredSkills.splice(index, 1);
        }
        this.selected = ""
    }


    onOK(): void {
        let job = new Job(
            this.nameControl.value,
            this.descriptionControl.value,
            this.requiredSkills,
        )

        this.storage.updateJob(job, this.data["_id"])
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.allowDelete = false;
        this.showDeleteConfirm = true;
    }

    cancelDelete(): void {
        this.allowDelete = true;
        this.showDeleteConfirm = false;
    }

    confirmDelete(): void {
        this.storage.deleteJob(this.data["_id"])
        this.dialogRef.close();
    }
}