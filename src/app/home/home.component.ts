import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: '';
  email: '';
  dob: '';
  manager: any;
  myManager: any;
  myChild: any;
  addUser: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    pass: new FormControl(null, Validators.required),
    eid: new FormControl(null, [Validators.required])
  });
  constructor(private users: UserService, private router: Router) {
    this.users.user().subscribe(
      data => this.addName(data),
      _err => this.router.navigate(['/login'])
    );
  }
  addName(data) {
    this.name = data.name;
    this.email = data.email;
    this.users.getMyManager(data.eid).subscribe(
      userData => {
        this.myManager = userData;
      }
    );

    this.users.getMyChilds(data._id).subscribe(
      childData => {
        this.myChild = childData;
      }
    )
  }

  ngOnInit() {
    this.users.getAlluser().subscribe(
      data => this.manager = data
    );
  }

  addUsers() {
    this.users.add(JSON.stringify(this.addUser.value))
    .subscribe(
      data => {
        console.log(data);
        this.addUser.reset();
      },
      error => console.error(error)
    );
  }

  logout() {
    this.users.logout().subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error => console.error(error)
    );
  }
}
