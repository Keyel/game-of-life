import { EventEmitter, Injectable } from '@angular/core';
import { CellInfo } from 'src/app/components/cell/CellInfo';

const numRows = 50; // Sorok száma
const numCols = 50; // Oszlopok száma

@Injectable({
    providedIn: 'root',
  })
export class LifeService {
    grid: CellInfo[][] = [];

    redraw = new EventEmitter<void>();    

    constructor() {
        this.init();
    }

    init = () => {
        for (let i = 0; i < numRows; i++) {
          this.grid[i] = [];
          for (let j = 0; j < numCols; j++) {
            this.grid[i][j] = { filled: false } as CellInfo;
          }
        }        
    }

    getGrid(): CellInfo[][] {
        return this.grid;
    }
    
    flip(row: number, col: number): void {
        console.log("this.grid[row][col].filled", this.grid[row][col].filled)
        this.grid[row][col].filled = !this.grid[row][col].filled;

        this.redraw.emit()
    }

    nextGeneration() {
        const newGrid: CellInfo[][] = []

        for (let i = 0; i < numRows; i++) {
            newGrid[i] = [];
            for (let j = 0; j < numCols; j++) {
              newGrid[i][j] = { filled: this.compute(i, j) } as CellInfo;
            }
        }
        
        this.grid = newGrid;
        this.redraw.emit();
    }

    
    private compute = (row: number, col: number): boolean => {
        const deltas = [-1, 0, +1]

        const neighbours = 
        deltas.flatMap(deltaRow => deltas.map(deltaCol => {
            return deltaRow  == 0 && deltaCol == 0 ? 0 : this.getState(row + deltaRow, col + deltaCol)
        })).reduce( (acc, state) => acc + state, 0)

        if(neighbours < 2) return false; //starve
        if(neighbours == 2) return this.grid[row][col].filled; //survive
        if(neighbours == 3) return true; //born
        return false; //too many
    }

    private getState = (row: number, col: number) : number => {
        if(row < 0 || row >= numRows || col < 0 || col >= numCols) return 0;
        return this.grid[row][col].filled ? 1 : 0;
    }
}
