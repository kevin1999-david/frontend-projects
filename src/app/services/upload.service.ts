import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()

export class UploadService {
    public url: string;


    constructor() {
        this.url = Global.url;
    }

    //Peticion Ajax
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
        return new Promise(function (resolve, reject) {
            var formData: FormData = new FormData();
            var xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let index = 0; index < files.length; index++) {
                formData.append(name, files[index], files[index].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

    
}