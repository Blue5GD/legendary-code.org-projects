// Stuff I didn't bother adding
// #1 Draws: stalemate, 3 fold repetition, etc
// #2 Time limits
// #3 Underpromotion

// SECTION 1: VARIABLES & INITIAL SETUP

var board = [
    ['Ra2', 'Nb2', 'Bc2', 'Qu2', 'Ki2', 'Bf2', 'Ng2', 'Rh2'],
    ['Pa2', 'Pb2', 'Pc2', 'Pd2', 'Pe2', 'Pf2', 'Pg2', 'Ph2'],
    ['000', '000', '000', '000', '000', '000', '000', '000'],
    ['000', '000', '000', '000', '000', '000', '000', '000'],
    ['000', '000', '000', '000', '000', '000', '000', '000'],
    ['000', '000', '000', '000', '000', '000', '000', '000'],
    ['Pa1', 'Pb1', 'Pc1', 'Pd1', 'Pe1', 'Pf1', 'Pg1', 'Ph1'],
    ['Ra1', 'Nb1', 'Bc1', 'Qu1', 'Ki1', 'Bf1', 'Ng1', 'Rh1']
];

// Track whose turn it is: 1 for white, 2 for black
var turn = 1;

var enPassantTarget = null; // To track the square available for en passant capture
var hasMoved = {
    'K1': false, 'K2': false,
    'Ra1': false, 'Rh1': false,
    'Ra2': false, 'Rh2': false
};
var moveHistory = [];
var isBoardFlipped = false;





// SECTION 2: EVENT HANDLERS

onEvent("moveButton", "click", function() {
  moveButton();
});

onEvent("undoButton", "click", function() {
    undoMove();
});

onEvent("flipBoardButton", "click", function() {
    flipBoard();
});

updateBoard();










// SECTION 3: MAIN FUNCTIONS

function printBoard(flip) {
    flip = flip || false; // Default value for flip is false
    var displayBoard = flip ? board.slice().reverse() : board;
    for (var i = 0; i < displayBoard.length; i++) {
        console.log(displayBoard[i].join(' '));
    }
    console.log("\n\n\n");
}



// Function to find the king's position
function findKing(color) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'Ki' + color) {
                return [i, j];
            }
        }
    }
    return null;
}



// Function to check if a position is under attack
function isPositionUnderAttack(row, col, attackerColor) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var piece = board[i][j];
            if (piece !== '000' && piece.charAt(2) === attackerColor) {
                if (isValidMove(i, j, row, col)) {
                    return true;
                }
            }
        }
    }
    return false;
}



// Function to check if a move is valid
function isValidMove(startRow, startCol, endRow, endCol) {
    var piece = board[startRow][startCol];
    var target = board[endRow][endCol];
    if (piece === '000' || (target !== '000' && piece.charAt(2) === target.charAt(2))) {
        return false; // No piece to move or moving to a square with the same color piece
    }
 
    var pieceType = piece.charAt(0);
    var color = piece.charAt(2);
    var direction = (color === '1') ? -1 : 1; // White moves up (direction -1), black moves down (direction 1)
    var startRank = (color === '1') ? 6 : 1; // Starting rank for pawns
 
    switch (pieceType) {
        case 'P':
            if (startCol === endCol) {
                if (target === '000') {
                    // Single move forward
                    if (endRow === startRow + direction) {
                        return true;
                    }
                    // Double move from starting position
                    if (startRow === startRank && endRow === startRow + 2 * direction && board[startRow + direction][startCol] === '000') {
                        return true;
                    }
                }
            } else if (Math.abs(endCol - startCol) === 1 && endRow === startRow + direction) {
                // Capturing move
                if (target !== '000') {
                    return true;
                }
                // En passant capture
                if (enPassantTarget && enPassantTarget.row === endRow && enPassantTarget.col === endCol) {
                    return true;
                }
            }
            break;
        case 'R':
            if (startRow === endRow || startCol === endCol) { // Horizontal or vertical
                return isPathClear(startRow, startCol, endRow, endCol);
            }
            break;
        case 'N':
            if ((Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1) || 
                (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 2)) { // L-shaped move
                return true;
            }
            break;
        case 'B':
            if (Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) { // Diagonal
                return isPathClear(startRow, startCol, endRow, endCol);
            }
            break;
        case 'Q':
            if (startRow === endRow || startCol === endCol || Math.abs(startRow - endRow) === Math.abs(startCol - endCol)) { // Horizontal, vertical, or diagonal
                return isPathClear(startRow, startCol, endRow, endCol);
            }
            break;
        case 'K':
            if (Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1) { // One square in any direction
                return true;
            }
            break;
    }
    return false;
}



// Function to check if the path between two points is clear
function isPathClear(startRow, startCol, endRow, endCol) {
    var rowDirection = endRow > startRow ? 1 : endRow < startRow ? -1 : 0;
    var colDirection = endCol > startCol ? 1 : endCol < startCol ? -1 : 0;
    var row = startRow + rowDirection;
    var col = startCol + colDirection;
    while (row !== endRow || col !== endCol) {
        if (board[row][col] !== '000') {
            return false; // Path is blocked
        }
        row += rowDirection;
        col += colDirection;
    }
    return true;
}



// Function to detect checkmate
function isCheckmate(color) {
    var kingPos = findKing(color);
    if (!kingPos) {
        console.log("King not found for color:", color);
        return false;
    }
 
    // Check if the king is in check
    if (!isPositionUnderAttack(kingPos[0], kingPos[1], color === '1' ? '2' : '1')) {
        return false;
    }
 
    // Check all possible moves for all pieces of the current player
    for (var startRow = 0; startRow < 8; startRow++) {
        for (var startCol = 0; startCol < 8; startCol++) {
            var piece = board[startRow][startCol];
            if (piece !== '000' && piece.charAt(2) === color) {
                for (var endRow = 0; endRow < 8; endRow++) {
                    for (var endCol = 0; endCol < 8; endCol++) {
                        if (isValidMove(startRow, startCol, endRow, endCol)) {
                            // Try the move
                            var originalEndPiece = board[endRow][endCol];
                            board[endRow][endCol] = piece;
                            board[startRow][startCol] = '000';
 
                            // Check if the king is still in check after the move
                            var newKingPos = (piece.charAt(0) === 'K') ? [endRow, endCol] : kingPos;
                            var stillInCheck = isPositionUnderAttack(newKingPos[0], newKingPos[1], color === '1' ? '2' : '1');
 
                            // Undo the move
                            board[startRow][startCol] = piece;
                            board[endRow][endCol] = originalEndPiece;
 
                            if (!stillInCheck) {
                                return false; // Found a valid move that gets out of check
                            }
                        }
                    }
                }
            }
        }
    }
 
    return true; // No valid moves found, it's checkmate
}



// Function to move pieces in the board variable and update GUI on screen
function movePiece(startRow, startCol, endRow, endCol) {
    var piece = board[startRow][startCol];
    var pieceColor = piece.charAt(2);
 
    if (!pieceColor) {
        console.log("Error: pieceColor is undefined or empty for piece:", piece);
        return false;
    }
 
    var isEnPassant = isEnPassantMove(startRow, startCol, endRow, endCol);
    var isCastling = isCastlingMove(startRow, startCol, endRow, endCol);
 
    if (isValidMove(startRow, startCol, endRow, endCol) || isEnPassant || isCastling) {
        var capturedPiece = board[endRow][endCol];
        var originalStartPiece = board[startRow][startCol];
        
        // Temporarily make the move on the board
        board[endRow][endCol] = board[startRow][startCol];
        board[startRow][startCol] = '000';
        
        // Handle en passant
        var capturedPawnRow, capturedPawnCol;
        if (isEnPassant) {
            capturedPawnRow = startRow;
            capturedPawnCol = endCol;
        }
        
        // Handle castling
        var rookStartCol, rookEndCol, rook;
        if (isCastling) {
            rookStartCol = (endCol === 6) ? 7 : 0;
            rookEndCol = (endCol === 6) ? 5 : 3;
            rook = board[startRow][rookStartCol];
            board[startRow][rookEndCol] = rook;
            board[startRow][rookStartCol] = '000';
        }
 
        var kingPos = findKing(pieceColor);
        if (!kingPos) {
            console.log("King not found for color:", pieceColor);
            return false;
        }
        var inCheck = isPositionUnderAttack(kingPos[0], kingPos[1], pieceColor === '1' ? '2' : '1');
        
        if (!inCheck) {
            console.log("Move is valid and doesn't put king in check.");
            
            // Update GUI
            hideElement(originalStartPiece);
            if (capturedPiece !== '000') {
                hideElement(capturedPiece);
            }
            showElement(board[endRow][endCol]);
            setPosition(board[endRow][endCol], endCol * 40 + 7.5, endRow * 40 + 7.5);
            
            if (isEnPassant) {
                hideElement(board[capturedPawnRow][capturedPawnCol]);
                board[capturedPawnRow][capturedPawnCol] = '000';
            }
            
            if (isCastling) {
                hideElement(rook);
                showElement(rook);
                setPosition(rook, rookEndCol * 40 + 7.5, startRow * 40 + 7.5);
            }
            
            checkPawnPromotion(endRow, endCol);
            hasMoved[piece] = true;
            
            enPassantTarget = (piece.charAt(0) === 'P' && Math.abs(startRow - endRow) === 2) ? { row: (startRow + endRow) / 2, col: startCol } : null;
            turn = (turn === 1) ? 2 : 1;
 
            // Check for checkmate
            if (isCheckmate(turn.toString())) {
                console.log("Checkmate! Game over. " + (turn === 1 ? "Black" : "White") + " wins!");
                showElement(turn === 1 ? "checkmateBlackLabel" : "checkmateWhiteLabel");
            }
 
            return true;
        } else {
            console.log("Move would put king in check. Reverting.");
            // Revert the move without updating GUI
            board[startRow][startCol] = originalStartPiece;
            board[endRow][endCol] = capturedPiece;
            if (isEnPassant) {
                board[capturedPawnRow][capturedPawnCol] = 'P' + (pieceColor === '1' ? '2' : '1');
            }
            if (isCastling) {
                board[startRow][rookStartCol] = rook;
                board[startRow][rookEndCol] = '000';
            }
        }
    } else {
        console.log("Move is not valid according to chess rules.");
    }
    return false;
}





// SECTION 4: SPECIAL MOVE FUNCTIONS

// Function to check and perform pawn promotion
function checkPawnPromotion(row, col) {
    var piece = board[row][col];
    if (piece.charAt(0) === 'P' && (row === 0 || row === 7)) {
        var color = piece.charAt(2);
        var file = piece.charAt(1);
        var newPiece = 'Q' + file + color; // Promote to Queen
        board[row][col] = newPiece;
        
        // Update GUI
        hideElement(piece); // Hide the pawn
        showElement(newPiece); // Show the queen
        setPosition(newPiece, col * 40 + 7.5, row * 40 + 7.5); // Position the queen
    }
}



// Function to check and perform en passant
function isEnPassantMove(startRow, startCol, endRow, endCol) {
    var piece = board[startRow][startCol];
    if (piece.charAt(0) === 'P' && enPassantTarget && 
        enPassantTarget.row === endRow && enPassantTarget.col === endCol) {
        var direction = piece.charAt(2) === '1' ? -1 : 1;
        return (startRow + direction === endRow) && (Math.abs(startCol - endCol) === 1);
    }
    return false;
}



// Function to handle castling
function isCastlingMove(startRow, startCol, endRow, endCol) {
    var piece = board[startRow][startCol];
    if (piece.charAt(0) === 'K' && Math.abs(startCol - endCol) === 2) {
        var rookCol = (endCol === 6) ? 7 : 0;
        var rook = board[startRow][rookCol];
        if (rook.charAt(0) === 'R' && !hasMoved[piece] && !hasMoved[rook] && isPathClear(startRow, startCol, startRow, rookCol)) {
            return true;
        }
    }
    return false;
}





// SECTION 5: GUI + ADDITIONAL FEATURES

// Function to place a piece on the board
function placePiece(piece, row, col) {
    var squareSize = 40;
    var pieceSize = 25;
    var centerX = col * squareSize + (squareSize - pieceSize) / 2;
    var centerY = row * squareSize + (squareSize - pieceSize) / 2;
 
    // Assuming setImageURL is a function that sets an image at the specified coordinates
    setPosition(piece, centerX, centerY);
}



// Function to update the board display
function updateBoard() {
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board[row].length; col++) {
            var piece = board[row][col];
            if (piece !== '000') {
                var displayRow = isBoardFlipped ? 7 - row : row;
                var displayCol = isBoardFlipped ? 7 - col : col;
                placePiece(piece, displayRow, displayCol);
            }
        }
    }
}



// Function to flip the board and update the GUI (leaves variable the same)
function flipBoard() {
    isBoardFlipped = !isBoardFlipped;
    updateBoard();
    
    if (isBoardFlipped) {
        hideElement("whitePerspective");
        showElement("blackPerspective");
    } else {
        hideElement("blackPerspective");
        showElement("whitePerspective");
    }
}



// Function to store the current state before making a move
function saveCurrentState() {
    var currentState = {
        board: JSON.parse(JSON.stringify(board)),
        enPassantTarget: enPassantTarget,
        hasMoved: JSON.parse(JSON.stringify(hasMoved)),
        turn: turn,
        hiddenPieces: [] // Array to store IDs of hidden pieces
    };
    
    // Store IDs of all hidden pieces
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            var piece = board[row][col];
            if (piece !== '000' && getProperty(piece, "hidden")) {
                currentState.hiddenPieces.push(piece);
            }
        }
    }
    
    moveHistory.push(currentState);
}



// Function to make a move by inputting the notation
function makeMove(startRow, startCol, endRow, endCol) {
    if (isBoardFlipped) {
        startRow = 7 - startRow;
        startCol = 7 - startCol;
        endRow = 7 - endRow;
        endCol = 7 - endCol;
    }
 
    saveCurrentState();
 
    if (movePiece(startRow, startCol, endRow, endCol)) {
        updateBoard();
        console.log("Move successful. Board updated.");
        printBoard(); // Print the board after a successful move
    } else {
        console.log("Invalid move.");
        moveHistory.pop();
    }
}



// Function to undo the last move
function undoMove() {
    if (moveHistory.length > 0) {
        var previousState = moveHistory.pop();
        var currentBoard = board;
        board = previousState.board;
        enPassantTarget = previousState.enPassantTarget;
        hasMoved = previousState.hasMoved;
        turn = previousState.turn;
        
        // Hide all pieces first
        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                var piece = currentBoard[row][col];
                if (piece !== '000') {
                    hideElement(piece);
                }
            }
        }

        // Use a function expression for isPieceHidden
        var isPieceHidden = function(piece) {
            for (var i = 0; i < previousState.hiddenPieces.length; i++) {
                if (previousState.hiddenPieces[i] === piece) {
                    return true;
                }
            }
            return false;
        };

        // Show pieces from the previous state
        for (var rowAlt = 0; rowAlt < 8; rowAlt++) {
            for (var colAlt = 0; colAlt < 8; colAlt++) {
                var pieceAlt = board[rowAlt][colAlt];
                if (pieceAlt !== '000' && !isPieceHidden(pieceAlt)) {
                    showElement(pieceAlt);
                }
            }
        }
        
        updateBoard();
        hideElement("checkmateWhiteLabel"); // Hide in case checkmate is undone
        hideElement("checkmateBlackLabel");
        printBoard(); // Print the board after undoing a move
        console.log("Move undone. Board reverted to previous state.");
    } else {
        console.log("No more moves to undo.");
    }
}









// To make the on-event section more concise - kinda useless
function moveButton () {
    var moveInput = getText("text_input");
    var from = moveInput.slice(0, 2);
    var to = moveInput.slice(2, 4);
 
    var fromRow = 8 - parseInt(from[1]);
    var fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
    var toRow = 8 - parseInt(to[1]);
    var toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);
 
    // Adjust coordinates if the board is flipped
    if (isBoardFlipped) {
        fromRow = 7 - fromRow;
        fromCol = 7 - fromCol;
        toRow = 7 - toRow;
        toCol = 7 - toCol;
    }
 
    makeMove(fromRow, fromCol, toRow, toCol);
}