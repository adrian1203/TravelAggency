import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppUser} from "../model/app-models";
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

  get r() {
    return this.registerForm.controls;
  }

  onSubmitLogin() {
    this.submittedLogin = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loadingLogin = true;
    const retValue = this.authenticationService.login(this.f.username.value, this.f.password.value);

    console.log(retValue);
    if (retValue === true) {
      this.router.navigate([this.returnUrl]);

    } else {
      // this.alertService.error();
      this.loading = false;
      this.submittedLogin = false;
    }


    // this.authenticationService.loginTmp(this.f.username.value, this.f.password.value);
    // this.router.navigate(['./tour-list']);

  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const user: AppUser = new AppUser();
    user.firstName = this.r.firstName.value;
    user.lastName = this.r.lastName.value;
    user.email = this.r.username.value;
    user.password = this.r.password.value;

    this.loading = true;

    const retValue = this.authenticationService.register(user);
    if (retValue === true) {
     // this.authenticationService.login(user.email, user.password);
      this.router.navigate(['./tour-list']);

    }else {
      // this.alertService.error();
      this.loading = false;
      this.submittedLogin = false;
    }
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

