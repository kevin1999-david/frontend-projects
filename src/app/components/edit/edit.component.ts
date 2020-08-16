import { Component, OnInit } from '@angular/core';
import { Project } from "../../models/projetc";
import { ProjectService } from "../../services/project.services";
import { UploadService } from "../../services/upload.service";
import { Global } from "../../services/global";
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project
  public save_project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;



  constructor(
    private _projectService: ProjectService,
    private _UploadService: UploadService,

    private _router: Router,
    private _route: ActivatedRoute

  ) {
    this.title = "Editar Proyecto";
    this.url = Global.url;
  }


  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }


  getProject(id) {
    this._projectService.getProject(id).subscribe(response => {
      this.project = response.project;
    }, error => {
      console.log(<any>error);
    });
  }
  onSubmit(form) {

    //Guardar los datos
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {


          if (this.filesToUpload) {
            //Subir la imagen
            this._UploadService.makeFileRequest(Global.url + "upload/" +
              response.project._id, [], this.filesToUpload, 'image').then((result: any) => {

                console.log(result);

                this.save_project = result.Project;


                this.status = "success";


              });
          } else {
            this.save_project = response.project;


            this.status = "success";
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
