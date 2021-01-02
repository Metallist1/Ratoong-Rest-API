import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import {UsersState} from '../../shared/states/users/users.state';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Select(UsersState.selectedUser) selectedUser: any;

  user: any;

  constructor() {
    this.selectedUser.subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }

  ngOnInit(): void {
  }

}
