import { AfterViewInit, Component } from '@angular/core';
import { IProjects, ISkills } from '../../interfaces/interface';
import { NgbCarouselConfig, NgbCarouselModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PortfolioService } from '../../services/portfolio.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltipModule,
    NgbCarouselModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {


  projects!: IProjects[];

  filterForm = this.fb.group({
    "skills": '',
    "projectName": ""
  })

  private _techStack: any;
  public get techStack(): Array<ISkills> {
    return this._techStack
  }

  get projectNameControl() {
    return this.filterForm.controls.projectName;
  }

  get skillsControl() {
    return this.filterForm.controls.skills;
  }

  constructor(private dataService: PortfolioService, private fb: FormBuilder, private carousel: NgbCarouselConfig) {
    this._techStack = this.dataService.skills.map((option: any) => {
      return { ...option, checked: false };
    })

    this.projects = this.dataService.projects;
    this.carousel.interval = 10000;
    this.carousel.pauseOnHover = true;
    // this.carousel.showNavigationArrows = false
  }

  ngAfterViewInit(): void {
    this.filterForm.valueChanges.subscribe({
      next: (value) => {
        this.filterData()
      }
    })


  }

  onSelectChange($event: any, option: any) {
    const checkbox = $event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSkills.push(option.name);
    } else {
      const index = this.selectedSkills.indexOf(option.name);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      }
    }
    this.filterForm.patchValue({ skills: this.selectedSkills });

  }

  get selectedSkills(): any {
    return this.filterForm.controls.skills.value || [];
  }

  set selectedSkills(value: any) {
    this.skillsControl.setValue(value);
  }



  filterData() {
    this.projects = this.dataService.projects.filter((project) => {
      let res = true;
      let searchString = <string>this.projectNameControl.value;
      if ((searchString).length > 0) {
        res = project.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase());
      }
      if (this.skillsControl?.value) {
        for (const skill of this.selectedSkills) { 
          let contains = false;
          let lwSkill = skill.toLocaleLowerCase();
          innerLoop: for (const existSkill of project.skills) {
            if (lwSkill.includes(existSkill.name.toLocaleLowerCase())) {
              contains = true;
              break innerLoop
            }
            for (const sub of existSkill.subTech || []) {
              if (lwSkill.includes(sub.toLocaleLowerCase())) {
                contains = true;
                break innerLoop
              }
            }
          }
          if (!contains) {
            return false;
          }
        }

      }
      return res;
    })
  }

  resetSelection() {
    this.techStack.forEach(element => {
      element.checked = false;
    });
    this.skillsControl.reset();
  }

  getDummyArray(size: number) {
    return new Array(size)
  }

  getImageAddress(directory: string, index: number) {
    // ("task-management/task-management (1).png").png"
    return `${directory}/${directory} (${index}).png`
  }
}
