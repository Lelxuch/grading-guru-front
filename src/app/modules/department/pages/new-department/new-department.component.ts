import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.scss']
})
export class NewDepartmentComponent {

  departmentForm: FormGroup;

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  private routeSub: Subscription;

  // Counter
  weightCounter: number = 0;

  // Form options
  formOffset = null;
  formSpan = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
    });

    this.departmentForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      sections: this.formBuilder.array([]),
      levels: this.formBuilder.array([])
    });

    this.addSection();
    this.addLevel();

    // Temp
    // const children: Array<{ label: string; value: string }> = [];
    // for (let i = 10; i < 36; i++) {
    //   children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    // }
    this.listOfOption = [
      {label: 'Git', value: 'Git'},
      {label: 'HTML', value: 'HTML'},
      {label: 'CSS', value: 'CSS'},
      {label: 'JavaScript', value: 'JavaScript'},
      {label: 'OOP', value: 'OOP'},
      {label: 'SOLID', value: 'SOLID'},
      {label: 'Angular', value: 'Angular'},
      {label: 'Angular Material UI', value: 'Angular Material UI'},
      {label: 'RxJS', value: 'RxJS'},
      {label: 'NgXS', value: 'NgXS'},
      {label: 'Unit Testing', value: 'Unit Testing'},
      {label: 'Server Side Rendering', value: 'Server Side Rendering'},
      {label: 'Docker', value: 'Docker'},
      {label: 'Figma', value: 'Figma'},
    ];
  }

  // Sections
  get sections(): FormArray {
    return this.departmentForm.get('sections') as FormArray
  }

  newSection(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      skills: [[], [Validators.required]]
    })
  }

  addSection(): void {
    this.sections.push(this.newSection());
  }

  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  // Levels
  get levels(): FormArray {
    return this.departmentForm.get('levels') as FormArray
  }

  newLevel(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      minValue: [null, [Validators.required]],
    })
  }

  addLevel(): void {
    this.levels.push(this.newLevel());
  }

  removeLevel(index: number): void {
    this.levels.removeAt(index);
  }

  submit(): void {
    console.log('submit', this.departmentForm.value);
    if (this.departmentForm.valid) {
      console.log('submit', this.departmentForm.value);
    } else {
      Object.values(this.departmentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  changeWeight(event: any): void {
    // console.log(this.departmentForm);
  }
}
