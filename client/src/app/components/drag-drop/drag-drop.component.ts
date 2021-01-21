import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { HomeComponent } from "../home/home.component";

import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})

export class DragDropComponent implements OnInit {

  fileArr = [];
  fileDesc: string;
  fileSkills = [];
  fileData = {};
  imgArr = [];
  fileObj = [];
  tags = null;
  form: FormGroup;
  msg: string;
  progress: number = 0;

  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public userService: UserService,
    public homeComponent: HomeComponent
  ) {

    this.form = this.fb.group({
      avatar: [null],
      desc: '',
      skills: [null]
    })
    console.log(localStorage.getItem('Id'))
  }


  ngOnInit() { }

  refreshImage() {
    this.homeComponent.getProtectedData()
  }
  clearFiles() {
    this.msg = null;
    this.fileArr = [];
    this.fileObj = [];
  }

  clearForm() {
    this.form.reset()
  }

  upload() {
    console.log(this.fileArr.length)

    if (this.fileArr.length != 0 && this.tags != null) {
      // Set files form control
      this.form.patchValue({
        avatar: this.fileObj
      })

      this.form.get('avatar').updateValueAndValidity()
      this.form.get('skills').updateValueAndValidity()
      this.form.get('desc').updateValueAndValidity()

      // Upload to server
      this.userService.addFiles(this.form.value.avatar, this.form.value.desc, this.tags)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              if (event.status == 500) {
                this.msg = "Only upload photos please.";
                this.progress = 0;
              }
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              this.msg = "Uploading!"
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('Photo uploaded successfully!', event.body);

              setTimeout(() => {
                this.homeComponent.getProtectedData()
                this.clearForm()
                this.progress = 0;
                this.fileArr = [];
                this.fileObj = [];
                this.msg = "Photo uploaded successfully!"
                setTimeout(() => {

                  this.msg = null;

                }, 2000);
              }, 400);
          }
        })
    } else {
      this.msg = "Add Skill";

    }


  }
  setFiles(e) {

    const fileListAsArray = Array.from(e);

    if (fileListAsArray.length != 0) {
      this.clearFiles()

      fileListAsArray.forEach((item, i) => {
        const file = (e as HTMLInputElement);
        const url = URL.createObjectURL(file[i]);
        this.imgArr.push(url);
        this.fileArr.push({ item, url: url });
      })

      this.fileArr.forEach((item) => {
        this.fileObj.push(item.item)
      })

      this.msg = "Photo Ready!"

    }
  }

  setFileDesc(e) {
    const fileDesc = e;
    this.fileDesc = fileDesc;
  }

  setFileSkills(e) {
    const fileSkills = e;
    this.fileSkills = fileSkills;
  }

  setFileData() {
    this.fileData = {
      title: null,
      desc: null,
      url: null,
      skills: null,

    }
  }

  hideButton() {
    if (this.fileArr.length != 0) {
      return "primary-button";
    } else {
      return "locked-button";
    }
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
