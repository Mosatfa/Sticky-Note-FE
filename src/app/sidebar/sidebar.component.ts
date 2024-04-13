import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialUser } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { ListsService } from '../lists.service';
import { List } from '../list';
import { NavbarTogglerService } from '../navbar-toggler.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isCollapsed: boolean = false;
  isVisibility: boolean = false;
  errMessage: boolean = false;
  isFieldBLocked: boolean = false
  listName: string = '';
  newNameList: string = '';
  term: string = '';
  lists: List[] = [];
  isloading = false

  // opne & close sidbar 
  navbarToggle() {
    this._NavbarTogglerService.toggle.subscribe({
      next: () => {
        this.isCollapsed = this._NavbarTogglerService.toggle.getValue()
      }
    })
  }

  isSelected() {
    this.isCollapsed = false
  }
  // open input update list
  openInput(list: List) {
    list.showInput = true;
    this.isFieldBLocked = true
    this.newNameList = list.listName
  }
  closeInput(list: List) {
    list.showInput = false;
    this.isFieldBLocked = false
  }

  // button add
  openInputList() {
    this.isVisibility = true
  }
  closeInputList() {
    this.isVisibility = false
    this.errMessage = false
  }

  // API
  // display Lists
  displayLists() {
    this._ListsService.getLists().subscribe({
      next: (response) => {
        this.lists = response.results
      }
    })
  }

  // Add List
  createList() {
    const colors: string[] = ['#D2EAEE', '#FFD9DC', '#FDF1B5', '#E76F70', '#E8CF73', '#94D2E1']
    if (this.listName.trim() === '') {
      this.errMessage = true;
      return
    }
    let list: object = {
      listName: this.listName,
      color: colors[Math.floor(Math.random() * colors.length)],
    }

    this._ListsService.postList(list).subscribe({
      next: (response) => {
        if (response.message == 'Done') {
          this.displayLists()
          this.listName = ''
          this.isVisibility = false
          this.errMessage = false
          this.isCollapsed = false
          this._Router.navigate(['/home', response.list._id])
        }
      }
    })
  }

  // update List
  saveAndUpdateList(id: string) {
    this.isloading = true
    if (this.newNameList.trim() === '') {
      return
    }
    this._ListsService.updateList(id, { listName: this.newNameList }).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this.displayLists()
          this.isloading = false
          this.isFieldBLocked = false
        }
      }
    })
  }

  // delete List
  deleteList(list: List) {
    list.isloading = true
    this._ListsService.deleteList(list._id).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this._Router.navigate(['/home'])
          // this.displayLists()
          this.lists = this.lists.filter(l => l._id != list._id)
          list.isloading = false
        }
      }
    })
  }

  //logOut
  logOut() {
    this._AuthService.signOut()
    this.authService.signOut(true)
  }

  constructor(private _AuthService: AuthService, private _ListsService: ListsService, private _Router: Router, private _NavbarTogglerService: NavbarTogglerService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.navbarToggle()
    this.displayLists()
  }

}
