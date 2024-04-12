import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListsService } from './lists.service';
import { List } from './list';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stickyNote';
  


  constructor(private _Router: Router, private _ListsService: ListsService) { }

  ngOnInit(): void {
    // this.getList()
  }
}
