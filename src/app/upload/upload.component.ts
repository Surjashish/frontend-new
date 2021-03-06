
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {
      HttpClient, HttpResponse, HttpRequest,
      HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';


@Component({
      selector: 'app-upload',
      templateUrl: './upload.component.html',
      styleUrls: ['./upload.component.css'],
      animations: [
            trigger('fadeInOut', [
                  state('in', style({ opacity: 100 })),
                  transition('* => void', [
                        animate(300, style({ opacity: 0 }))
                  ])
            ])
      ]
})
export class UploadComponent implements OnInit {
      /** Link text */
      @Input() text = 'Upload';
      /** Name used in form which will be sent in HTTP request. */
      @Input() param = 'file';
      /** Target URL for file uploading. */
      // @Input() target = 'https://file.io';
      /** File extension that accepted, same as 'accept' of <input type="file" />. 
          By the default, it's set to 'image/*'. */
      @Input() target = 'http://13.235.222.93:8080/content-service/api/v1/file/';
      @Input() accept = '*';
      /** Allow you to add handler after its completion. Bubble up response text from remote. */
      @Output() complete = new EventEmitter<string>();

      private files: Array<FileUploadModel> = [];
      constructor(private _http: HttpClient) { }

      ngOnInit() {
      }
      onClick() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.onchange = () => {
                  for (let index = 0; index < fileUpload.files.length; index++) {
                        const file = fileUpload.files[index];
                        this.files.push({
                              data: file, state: 'in',
                              inProgress: false, progress: 0, canRetry: false, canCancel: true
                        });
                  }
                  this.uploadFiles();
            };
            fileUpload.click();
      }
      cancelFile(file: FileUploadModel) {
            file.sub.unsubscribe();
            this.removeFileFromArray(file);
      }

      retryFile(file: FileUploadModel) {
            this.uploadFile(file);
            file.canRetry = false;
      }

      response:any;
      private uploadFile(file: FileUploadModel) {
            const fd = new FormData();
            fd.append(this.param, file.data);

            const req = new HttpRequest('POST', this.target, fd, {
                  reportProgress: true
            });

            const request = new HttpRequest('POST', this.target, fd, { responseType: 'text' });

            file.inProgress = true;
            // file.sub = this._http.request(req).pipe(
            //       map(event => {
            //             switch (event.type) {
            //                   case HttpEventType.UploadProgress:
            //                         file.progress = Math.round(event.loaded * 100 / event.total);
            //                         break;
            //                   case HttpEventType.Response:
            //                         return event;
            //             }
            //       }),
            //       tap(message => { }),
            //       last(),
            //       catchError((error: HttpErrorResponse) => {
            //             file.inProgress = false;
            //             file.canRetry = true;
            //             return of(`${file.data.name} upload failed.`);
            //       })
            // ).subscribe(
            //       (event: any) => {
            //             //   if (typeof (event) === 'object') {
            //             //         this.removeFileFromArray(file);
            //             //         this.complete.emit(event.body);
            //             //   }
            //             console.log(JSON.stringify(event));
            //       }
            // );
            file.sub;
            const fds = new FormData();
            this._http.request(request).subscribe(data => {
                  this.response = data['body'];
                  console.log("abc" + this.response);
                  
            })
      }

      private uploadFiles() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.value = '';

            this.files.forEach(file => {
                  this.uploadFile(file);
            });
      }

      private removeFileFromArray(file: FileUploadModel) {
            const index = this.files.indexOf(file);
            if (index > -1) {
                  this.files.splice(index, 1);
            }
      }
      post:any;
      addPost(title, category, tags) {
            let obj = this.checkToken(JSON.stringify(localStorage.getItem('jwt')));
            let username = obj.sub;
            
            console.log("testing post "+ username);
            this.post = {
                  "id": 122,
                  "title": title,
                  "category": category,
                  "tags": tags,
                  "videoUrl": this.response,
                  "postedBy": {
                        "username": username
                  }
            }
            console.log("testing post 2 "+ JSON.stringify(this.post));
            this._http.post('http://13.235.222.93:8080/content-service/api/v1/post', this.post);
      }
      checkToken(tokenStr) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(tokenStr);
            console.log(decodedToken);
            
            return decodedToken;
          }

}

export class FileUploadModel {
      data: File;
      state: string;
      inProgress: boolean;
      progress: number;
      canRetry: boolean;
      canCancel: boolean;
      sub?: Subscription;
}

