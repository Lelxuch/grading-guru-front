import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface DataModel {
  id?: number,
  sections: {
    id?: number,
    name: string,
    skills: {
      name: string,
      value: number;
      date?: Date;
    }[]
  }[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  isGrading: boolean = false;
  isUpgrading: boolean = false;
  isUpgradeComplete: boolean = false;
  isUpgradeLoading: boolean = false;
  tabIndex: number = 0;

  dateModel: Date[] = [];

  data: DataModel;

  gradeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.data = {
      id: 1,
      sections: [
        {
          id: 1,
          name: 'Basic hard skills',
          skills: [
            {
              name: 'Solid',
              value: 4
            },
            {
              name: 'OOP',
              value: 5
            },
          ]
        },
        {
          id: 1,
          name: 'Hard skills',
          skills: [
            {
              name: 'Angular',
              value: 3
            },
            {
              name: 'Javascript',
              value: 1
            },
            {
              name: 'Git',
              value: 2
            },
            {
              name: 'NGXS',
              value: 4
            }
          ]
        },
        {
          id: 1,
          name: 'Soft skills',
          skills: [
            {
              name: 'Коммуникабельность',
              value: 4
            },
            {
              name: 'Лидерство',
              value: 3
            },
          ]
        }
      ]
    }
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());
    this.dateModel.push(new Date());

    this.gradeForm = this.formBuilder.group({
      id: null,
      sections: this.formBuilder.array([]),
    });
  }

  startGrade(): void {
    this.isGrading = true;
    this.patchGradeForm();
  }

  patchGradeForm(): void {
    this.gradeForm.reset();
    this.gradeForm.patchValue(this.data);
    for (let i = 0; i < this.data.sections.length; ++i) {
      this.patchAddSection(this.data.sections[i]);
    }
    for (let i = 0; i < this.data.sections.length; ++i) {
      for (let j = 0; j < this.data.sections[i].skills.length; ++j) {
        this.patchAddSkill(i, this.data.sections[i].skills[j]);
        // console.log(i, this.data.sections[i].skills[j]);
      }
    }
    console.log(this.gradeForm.getRawValue());
  }

  get sections(): FormArray {
    return this.gradeForm.get('sections') as FormArray
  }

  newSection(): FormGroup {
    return this.formBuilder.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      skills: this.formBuilder.array([])
    })
  }

  addSection(): void {
    this.sections.push(this.newSection());
  }

  patchAddSection(sectionTemp: any) {
    let section = this.formBuilder.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      skills: this.formBuilder.array([])
    });
    let sectionToPatch = {
      id: sectionTemp.id,
      name: sectionTemp.name,
      skills: sectionTemp.skils
    }
    section.patchValue(sectionToPatch);
    this.sections.push(section);
  }

  skills(i: number): FormArray {
    return this.sections.at(i).get('skills') as FormArray;
  }

  newSkill() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      date: [new Date(), Validators.required]
    })
  }

  addLesson(i: number) {
    let sectionId = this.data.sections[i].id;
    this.skills(i).push(this.newSkill());
  }

  patchAddSkill(i: number, lessonTemp: any) {
    let skill = this.formBuilder.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      date: [new Date(), Validators.required],
    })
    let skillToPatch = {
      name: lessonTemp.name,
      value: lessonTemp.value,
      date: new Date()
    }
    skill.patchValue(skillToPatch);
    this.skills(i).push(skill);
  }

  cancelGrade(): void {
    this.isGrading = false;
    this.gradeForm.reset();
  }

  gradeSubmit(): void {
    this.isGrading = false;
  }

  // Upgrade;
  startUpgrade(): void {
    this.isUpgrading = true;
    this.patchGradeForm();
    console.log(this.gradeForm.getRawValue());
  }

  onDateChange(event: any): void {
    console.log(event);
  }

  upgradeSubmit(): void {
    this.isUpgradeComplete = true;
    this.isUpgradeLoading = true;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.isUpgradeLoading = false;
    }, 350);
  }
}
