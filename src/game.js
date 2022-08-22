var container = document.getElementById('game') 

/**
 * This is to have a clean board, the board data (array) is nested in this class.
 */
class CellManager {

    /**
     * Game configuration
     * @param {Object} settings 
     * @param {number} settings.rows Default is `11`
     * @param {number} settings.cellsPerRow Default is `11`
     * @param {number} settings.mineDensity Default is `5`
     */
    constructor(settings){
        this.rows = settings.rows ? settings.rows : 11
        this.cellsPerRow = settings.cellsPerRow ? settings.cellsPerRow : 11
        this.mineDensity = settings.mineDensity ? settings.mineDensity : 5
    }

    /**
     * Array of cells, all cells are added in here.
     */
    cells = []

    getCell = (x,y) => {
        let search = this.cells.find(c => c.x === x && c.y === y)
        return search ? search : null
    }

    getAdjacentCells = (x,y) => {
        let result = []
        let cx = x
        let cy = y
        let calculations = [
            {x: cx - 0.5, y: cy - 1}, //top left (offset)
            {x: cx - 1, y: cy - 1}, //top left (inline)
            {x: cx + 0.5, y: cy - 1}, //top right (offset)
            {x: cx + 1, y: cy - 1}, //top right (inline)
            {x: cx - 0.5, y: cy}, //left (offset)
            {x: cx - 1, y: cy}, //left (inline)
            {x: cx + 0.5, y: cy}, //right (offset)
            {x: cx + 1, y: cy}, //right (inline)
            {x: cx - 0.5, y: cy + 1}, //bottom left (offset)
            {x: cx - 1, y: cy + 1}, //bottom left (inline)
            {x: cx + 0.5, y: cy + 1}, //bottom right (offset)
            {x: cx + 1, y: cy + 1} //bottom right (inline)
        ]

        for (const calc of calculations){
            let satisifiedCell = this.getCell(calc.x, calc.y)
            if (satisifiedCell){
                result.push(satisifiedCell)
            }
        }
        return result
    }

    /**
     * @param {Object} cellData New cell data
     * @param {number} cellData.x X pos, starts from 0
     * @param {number} cellData.y Y pos, starts from 0
     * @param {string} cellData.type Cell type, one of;
     * - bomb
     * - empty
     * - type1
     * - type2
     * - type3
     * - type4
     * - type5
     * - type6
     * - flag
     * @param {boolean} cellData.opened Whether the cell is opened
     * @param {HTMLDivElement} cellData.html The HTML element of the cell
     * @param {boolean} cellData.isOffset Whether it's an offsetted cell, half a X pos are applied.
     */
    add = (cellData) => {
        if (typeof cellData == "object"){
            this.cells.push(cellData)
        }else{
            throw Error("cellData must be type object")
        }
    }

    generateBoard = async () => {
        for (let row = 0; row < this.rows; row++){
            let rowHTML = document.createElement("row")
            let divider = document.createElement("br")
            container.append(rowHTML)
            container.append(divider)
            for (let cell = 0; cell < this.cellsPerRow; cell++){
                let isOffset = (row % 2 !== 0)
                let xPos = isOffset ? cell + 0.5 : cell
                let cellHTML = document.createElement("div")
                let obj = {x: xPos, y: row, type: null, opened: false, html: cellHTML, isOffset}
                this.add(obj)
                rowHTML.appendChild(cellHTML)
            }
        }
        return this.cells
    }

    generateMines = async () => {
        this.cells.forEach((cell, index, board) => {
            
        })
    }

    setAdjacentCells = async () => {
        for (const cell of this.cells){
            cell.adjacentCells = this.getAdjacentCells(cell.x, cell.y, cell.isOffset)
        }
    }
}

var onClick = (cell) => {

}

var board = new CellManager({rows: 2, cellsPerRow: 2, mineDensity: 5})

board.generateBoard().then(() => {
    board.setAdjacentCells()
})


console.log(board.cells)