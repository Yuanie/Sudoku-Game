import { Matrix } from "./toolkit";
import Generator from "./generator";

export default class Sudoku {
    matrix: Matrix<number>;
    puzzleMatrix: Matrix<number>;

    constructor() {
        this.matrix = new Generator().generate();
    }

    make(level: number = 5): Matrix<number> {
        this.puzzleMatrix = this.matrix.map(row => {
            return row.map(v => Math.random() * 9 < level ? 0 : v);
        });
        return this.puzzleMatrix;
    }
}
