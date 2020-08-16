import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/projetc";
import { ProjectService } from "../../services/project.services";
import { Global } from "../../services/global";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public url: string;

  constructor(
    private _projectService: ProjectService
  ) {

    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe(response => {
      if (response.projects) {
        this.projects = response.projects;
      }
    }, error => {
      console.log(error);
    });
  }

  buyImage(idProducto: String) {
    console.log("Has comprado esta imagen");
    console.log(idProducto);
  }

}
