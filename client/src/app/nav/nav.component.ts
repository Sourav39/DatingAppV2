import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  loginForm!: FormGroup;
  
  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password' : new FormControl('', [Validators.required])
    });
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe({
  //     next: user => this.loggedIn = !!user,
  //     error: error => console.log(error)
  //   })
  // }

  onLogin() {
    debugger;
    console.log("Login form data:" + this.loginForm.value.username + "," + " " + this.loginForm.value.password);

    this.accountService.login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe({
      next: response => {
        console.log(response);      
        this.router.navigateByUrl('/members');
      },
      error: error => this.toastr.error(error.error)
    })
  }

  loggOut() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
