import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../../model/loginData.interface";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
 sub!:Subscription;
  user:User | null = null

  ngOnDestroy(): void {
   this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub =  this.authService.user.subscribe(
      (value) =>{
        this.user = value
      }
    )
  }

  constructor( private authService:AuthService) {
  }
  logOut(){
    this.authService.logout()
  }

}
