import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  isCollapsed = false;

  companyId: string | null;
  departmentId: number;

  // Modals
  joinModalVisible: boolean = false;
  joinConfirmLoading: boolean = false;

  // Join Modal data
  joinCode: string = '';

  // Selected Condition
  companySelected: boolean = false;
  departmentSelected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router : Router
  ) {
  }

  ngOnInit(): void {
    this.router.events
      .subscribe(() => {
        this.getCurrentLocation();
      })
    // this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    const urlSplit = this.router.url.split('/');
    if (
      urlSplit[1] == 'company' &&
      this.isNumeric(urlSplit[2]) &&
      urlSplit[3] !== 'department'
    ) {
      this.companySelected = true;
      this.departmentSelected = false;
    }
    else if (
      urlSplit[1] == 'company' &&
      this.isNumeric(urlSplit[2]) &&
      urlSplit[3] == 'department' &&
      this.isNumeric(urlSplit[4])
    ) {
      this.departmentSelected = true;
      this.companySelected = false;
    } else {
      this.companySelected = false;
      this.departmentSelected = false;
    }
  }

  isNumeric(str: string): boolean {
    return !isNaN(Number(str)) &&
      !isNaN(parseFloat(str))
  }

  logout(): void {
    this.authService.logout();
  }

  // Modals
  showJoinModal(): void {
    this.joinModalVisible = true;
  }

  handleJoinCancel(): void {
    this.joinModalVisible = false;
  }

  handleJoinOk(): void {
    if (this.joinCode) {
      // TODO: send data to back
      this.joinModalVisible = false;
    }
  }
}
