import { Component, Input, OnInit } from '@angular/core';
import { Path } from 'paper/dist/paper-core';
import { LifeService } from 'src/app/services/life/life.service';
import * as paper from 'paper';

const CELL_SIZE = 15;
const BLACK: paper.Color = new paper.Color(0,0,0);
const WHITE: paper.Color = new paper.Color(1,1,1);
const RED: paper.Color = new paper.Color(1,0,0);

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
})
export class CellComponent implements OnInit {
    @Input() Col: number = 0;
    @Input() Row: number = 0;

    path!: paper.Path.Rectangle
    constructor(private lifeService: LifeService) {
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.init()
        this.lifeService.redraw.subscribe(() => {
            this.draw();
        });
    }

    init = () => {
        this.path = new Path.Rectangle(new paper.Point(this.Col*CELL_SIZE,this.Row*CELL_SIZE), new paper.Size(CELL_SIZE,CELL_SIZE));    

        this.path.onClick = (event: MouseEvent) => {
            this.lifeService.flip(this.Row, this.Col)
            //this.draw();
        }        

        this.draw();
    }

    draw = () => {
        const state = this.lifeService.getCellState(this.Row, this.Col);
        const generation = this.lifeService.getGenerationNumber();
        const generationDelta = generation - state.generation;
        this.path.strokeColor = BLACK;
        this.path.fillColor = 
            !state.filled ? WHITE :
            generationDelta < 1 ? RED :
            BLACK;
    }
}
