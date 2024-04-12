import { NoteService } from './../note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { NavbarTogglerService } from '../navbar-toggler.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  listId: string | null = '';
  noteId: string = '';
  selectColor: string | undefined = '#FFD4A9';

  notes: Note[] = [];

  isCollapsed: boolean = false
  mode: boolean = false
  isLoading: boolean = false

  noteForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    color: new FormControl('#FFD4A9')
  })

  // move content 
  navbarToggle() {
    this._NavbarTogglerService.toggle.subscribe({
      next: () => {
        this.isCollapsed = this._NavbarTogglerService.toggle.getValue()
      }
    })
  }

  // select note Color
  selectColorInput(color: string) {
    this.selectColor = color
  }

  // display Notes
  displayNote(id: any) {
    this.isLoading = true
    this._NoteService.getNote(id).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this.isLoading = false
          this.notes = res.results
        }
      }
    })
  }
  // add and update note
  save() {
    if (!this.mode) {
      this.addNote()
    } else {
      this.updateNote()
    }
  }
  // add Note
  addNote() {
    if (!this.noteForm.value.color) {
      this.noteForm.value.color = '#FFD4A9'
    }
    if (this.noteForm.valid) {
      this._NoteService.postNote(this.listId, this.noteForm.value).subscribe({
        next: (res) => {
          if (res.message = 'Done') {
            this.notes.push(res.note)
            this.noteForm.reset()
            // this.displayNote(this.listId)
          }
        }
      })
    }
  }

  // update Note
  updateNote() {
    if (this.noteForm.valid) {
      this._NoteService.updateNote(this.noteId, this.noteForm.value).subscribe({
        next: (res) => {
          if (res.message = 'Done') {
            // this.displayNote(this.listId)
            this.notes.push(this.noteForm.value)
            this.notes = this.notes.filter(note => note._id != this.noteId)
            this.noteForm.reset()
          }
        }
      })
    }
  }
  // reset form
  reset() {
    this.noteForm.reset()
    this.mode = false
  }
  // set Value note
  setValue(note: Note) {
    this.mode = true
    this.noteId = note._id
    this.selectColor = note.color
    this.noteForm.setValue({
      title: note.title,
      description: note.description,
      color: note.color
    })
  }
  //delete
  deleteNote(id: string) {
    this._NoteService.deleteNote(id).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          // this.displayNote(this.listId)
          this.notes = this.notes.filter(note => note._id != id)
        }
      }
    })
  }


  constructor(private _NoteService: NoteService, private _ActivatedRoute: ActivatedRoute, private _NavbarTogglerService: NavbarTogglerService, private _Router: Router) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      const id = params.get('id')
      this.listId = id
      this.displayNote(id)
    })

    this.navbarToggle()
  }

}
