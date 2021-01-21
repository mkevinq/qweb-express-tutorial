
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user/user.service';

import { Router } from '@angular/router';

imports: [MatButtonModule];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userdata = null;
  imageData = null;
  currentImageFilter = null;
  constructor(private user: UserService, private router: Router) { }

  getProtectedData() {
    this.user.getProtectedData().subscribe((data: any) => { this.userdata = data.user; console.log(data) });
    this.user.getImages().subscribe((data: any) => { this.imageData = data; console.log(data) });

  }
  deletePost(image_id) {
    let payload = image_id;
    console.log(payload)
    this.user.deletePost(payload).subscribe((data: any) => { this.getProtectedData(); console.log(data) });
  }

  filterImageData() {
    if (this.currentImageFilter != null) {
      return this.imageData.images.filter(a => a.skills.includes(this.currentImageFilter)).slice();
    } else return this.imageData.images.slice();

  }
  ngOnInit() {
    this.getProtectedData();
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Id');
    this.router.navigate(['/login']);
  }

  //UI Helpers
  setFilter(filter){
    this.currentImageFilter = filter;
  }
  getTotalString() {
    if (this.imageData.images.length >= 1000) {
      return '10,000';
    } else if (this.imageData.images.length >= 100) {
      return '1,000';
    } else if (this.imageData.images.length >= 10) {
      return '100';
    } else {
      return '10';
    }
  }

  getTotalInt() {
    if (this.imageData.images.length >= 1000) {
      return 10000;
    } else if (this.imageData.images.length >= 100) {
      return 1000;
    } else if (this.imageData.images.length >= 10) {
      return 100;
    } else {
      return 10;
    }
  }

  getProgressWidth() {
    console.log(((this.filterImageData().lengthlength / this.getTotalInt()) * 100))
    return ((this.filterImageData().length / this.getTotalInt()) * 100);
  }
}
