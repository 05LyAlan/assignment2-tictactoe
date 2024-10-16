"use strict";

let app = {
    data() {
        return {
            board: [
                [{ icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }],
                [{ icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }],
                [{ icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }]
            ],
            currentPlayer: 'X',
            gameWon: false,
        }
    },
    methods: {
        makeMove(rowIndex, colIndex) {
            if (this.board[rowIndex][colIndex].icon === 'fa fa-fw' && !this.gameWon) {
                this.board[rowIndex][colIndex].icon = this.currentPlayer === 'X' ? 'fa fa-fw fa-remove' : 'fa fa-fw fa-circle-o';
                if (this.checkWinner()) {
                    this.highlightWinningCells();
                    this.gameWon = true;
                } else {
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        },
        checkWinner() {
            const winningCombos = [
                // Rows
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                // Columns
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                // Diagonals
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]]
            ];

            for (let combination of winningCombos) {
                const [a, b, c] = combination;
                if (this.board[a[0]][a[1]].icon !== 'fa fa-fw' && this.board[a[0]][a[1]].icon === this.board[b[0]][b[1]].icon && this.board[a[0]][a[1]].icon === this.board[c[0]][c[1]].icon) {
                    this.winningCombos = combination;
                    return true;
                }
            }
            return false;
        },
        highlightWinningCells() {
            for (let [row, col] of this.winningCombos) {
                this.board[row][col].isWinningCell = true;
            }
        },
        resetGame() {
            this.board = [
                [{ icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }],
                [{ icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }],
                [{ icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }, { icon: 'fa fa-fw', isWinningCell: false }]
            ];
            this.currentPlayer = 'X';
            this.gameWon = false;
        }
    }
};

Vue.createApp(app).mount("#app");


