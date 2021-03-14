import { Team } from "./../../types.d";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { format } from "date-fns/fp";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "app-modal-window",
  templateUrl: "./modal-window.component.html",
  styleUrls: ["./modal-window.component.scss"],
})
export class ModalWindowComponent implements OnInit {
  form: FormGroup = this.fb.group({
    team: ["", Validators.required],
    userName: ["", Validators.required],
    from: ["", Validators.required],
    to: ["", Validators.required],
    type: ["Paid", Validators.required],
  });

  selectedDays: number;

  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Team[]
  ) {}

  ngOnInit(): void {
    this.toControl.valueChanges.subscribe((value) => {
      const from = new Date(this.fromControl.value).getTime() / 1000;
      const to = new Date(value).getTime() / 1000;

      this.selectedDays = (to - from) / 86400;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  send() {
    if (this.form.invalid) {
      this.teamControl.markAsTouched();
      this.userNameControl.markAsTouched();
      this.typeControl.markAsTouched();
      return;
    }
    const from = format("d.MM.y", new Date(this.form.value.from));
    const to = format("d.MM.y", new Date(this.form.value.to));
    this.dialogRef.close({
      ...this.form.value,
      teamName: this.teamControl.value.name,
      from,
      to,
    });
  }

  get fromControl(): AbstractControl {
    return this.form.get("from") as AbstractControl;
  }

  get toControl(): AbstractControl {
    return this.form.get("to") as AbstractControl;
  }

  get userNameControl(): AbstractControl {
    return this.form.get("userName") as AbstractControl;
  }

  get typeControl(): AbstractControl {
    return this.form.get("type") as AbstractControl;
  }

  get teamControl(): AbstractControl {
    return this.form.get("team") as AbstractControl;
  }
}
