import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as paper from 'paper';
import { Path, Project } from 'paper/dist/paper-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'game-of-life';
    

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window['paper'] = paper;
    const project = new Project('canvas');

    const path = new Path.Rectangle(new paper.Point(40,40), new paper.Size(100,100));    
    path.strokeColor = paper.Color.random();
    path.fillColor = new paper.Color(0,0,0);

    path.onClick = (event: MouseEvent) => {
        path.fillColor = paper.Color.random();
    }
  }
}
