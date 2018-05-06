import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit {

  @Input()
  content: string;
  
  constructor(
  ){}

  ngOnInit(): void {
  }

}