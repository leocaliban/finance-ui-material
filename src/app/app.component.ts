import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router
    ) {
    this.toastyConfig.theme = 'material';
    this.toastyConfig.position = 'top-right';
   }

  ngOnInit() {
  }

  exibirNavbar() {
    return this.router.url !== '/login';
  }
}
