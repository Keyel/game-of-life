import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as paper from 'paper';
import { Path, Project } from 'paper/dist/paper-core';
import { CellInfo } from './components/cell/CellInfo';
import { LifeService } from './services/life/life.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'game-of-life';
  
  constructor(private lifeService: LifeService) {
    
  }

  grid: CellInfo[][] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window['paper'] = paper;
    const project = new Project('canvas');
    this.grid = this.lifeService.getGrid();
  }

  onNextGeneration = () => {
    this.lifeService.nextGeneration()
  }
}
