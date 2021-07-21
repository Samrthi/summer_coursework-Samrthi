import {Component, Inject, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../storage.service";
import {Candidate} from "../candidate";
import {EditProfileDialogData} from "./candidate-profile.component";

@Component({
    selector: 'edit-profile-dialog',
    templateUrl: 'edit-profile-dialog.html',
})
export class EditProfileDialogComponent implements OnInit {
    profileNameControl: FormControl;
    statementControl: FormControl;
    skills: string[] = [];
    userSkills: string[];
    selected = ""
    skillDict = {};
    searchable: boolean;

    constructor(
        public dialogRef: MatDialogRef<EditProfileDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditProfileDialogData,
        private storage: StorageService,
    ) {}

    ngOnInit(): void {
        this.searchable = this.data.profile.searchable
        this.profileNameControl = new FormControl(this.data.profile.name);
        this.statementControl = new FormControl(this.data.profile.statement);
        this.userSkills = [...this.data.profile.skills]
        this.storage.getSkillList().subscribe(skills => {
            skills.forEach(skill => {
                this.skillDict[skill._id] = skill.name
                if (!this.userSkills.includes(skill._id)) {
                    this.skills.push(skill._id)
                }
            })
        })
    }

    addSkill(skill_id: string): void {
        this.userSkills.push(skill_id)
        const index = this.skills.indexOf(skill_id, 0);
        if (index > -1) {
            this.skills.splice(index, 1);
        }
        this.selected = ""
    }

    removeSkill(skill_id: string): void {
        this.skills.push(skill_id)
        const index = this.userSkills.indexOf(skill_id, 0);
        if (index > -1) {
            this.userSkills.splice(index, 1);
        }
        this.selected = ""
    }


    onOK(): void {
        console.log(this.userSkills)
        let candidate = new Candidate(
            this.profileNameControl.value,
            this.statementControl.value,
            this.userSkills,
            this.searchable,
        )
        this.storage.updateCandidate(candidate)
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.data.allowDelete = false;
        this.data.showDeleteConfirm = true;
    }

    cancelDelete(): void {
        this.data.allowDelete = true;
        this.data.showDeleteConfirm = false;
    }

    confirmDelete(): void {
        this.storage.deleteCandidate()
        this.dialogRef.close();
    }
}