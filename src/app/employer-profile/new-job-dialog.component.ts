import {Component, Inject, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../storage.service";
import {Job} from "../job";

@Component({
    selector: 'new-job-dialog',
    templateUrl: 'new-job-dialog.html',
})
export class NewJobDialogComponent implements OnInit {
    nameControl: FormControl;
    descriptionControl: FormControl;
    skills: string[] = [];
    requiredSkills: string[] = [];
    skillDict = {};
    selected = ""

    constructor(
        public dialogRef: MatDialogRef<NewJobDialogComponent>,
        private storage: StorageService,
    ) {
    }

    ngOnInit(): void {
        this.nameControl = new FormControl()
        this.descriptionControl = new FormControl()
        this.storage.getSkillList().subscribe(skills => {
            skills.forEach(skill => {
                this.skillDict[skill._id] = skill.name
                this.skills.push(skill._id)
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

        this.storage.addJob(job)
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}