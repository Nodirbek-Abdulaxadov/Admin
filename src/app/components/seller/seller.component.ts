import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private userService: UserService){}

  count: number = 0;
  users: Observable<User[]> | undefined;

  ngOnInit(): void {
    this.users = this.userService.getAll('sellers');
  }
}