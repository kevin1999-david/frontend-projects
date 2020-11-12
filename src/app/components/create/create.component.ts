import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/projetc";
import { ProjectService } from "../../services/project.services";
import { UploadService } from "../../services/upload.service";
import { Global } from "../../services/global";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project
  public save_project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;



  constructor(
    private _projectService: ProjectService,
    private _UploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project("", "", "", "", 2020, "", "");
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          //Subir la imagen
          if (this.filesToUpload) {
            this._UploadService.makeFileRequest(Global.url + "upload/" +
              response.project._id, [], this.filesToUpload, 'image').then((result: any) => {
                console.log(result);
                this.save_project = result.Project;
                this.status = "success";
                form.reset();
              });
          } else {
            this.save_project = response.project;
            this.status = "success";
            form.reset();
          }
        } else {
          this.status = "failed";
        }

      }, error => {

        console.log(<any>error);
      });
  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}


