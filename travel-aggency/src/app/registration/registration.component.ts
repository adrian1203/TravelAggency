import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/app-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../autentication.service";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  loginForm: FormGroup;
  loadingLogin = false;
  submittedLogin = false;
  returnUrl: string;

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['./tour-list']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // get return url from route parameters or default to '/'
  //  this.returnUrl = this.route.snapshot.queryParams['tour-list'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmitLogin() {
    this.submittedLogin = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loadingLogin = true;
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });

    this.authenticationService.loginTmp();
    this.router.navigate(['./tour-list']);

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    // this.userService.register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.alertService.success('Registration successful', true);
    //       this.router.navigate(['/login']);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });
  }
}

