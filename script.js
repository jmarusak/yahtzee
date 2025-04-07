let selectedPlayer = null;
let currentInput = '';
let operation = '+';

function resetOperation() {
    operation = '+';
}

// Initialize scores array
const scores = [0, 0, 0, 0];

// Get all score buttons and calculator buttons
const scoreButtons = document.querySelectorAll('.score-button');
const calcButtons = document.querySelectorAll('.calc-button');

// Add these functions at the beginning of the file
function updateDisplay() {
    const inputDisplay = document.querySelector('.calc-input');
    
    if (selectedPlayer !== null) {
        const playerScore = scores[selectedPlayer];
        const lastScore = operation ? `${playerScore} ${operation}` : playerScore;
        inputDisplay.textContent = lastScore + ' ' + currentInput || '0';
    } else {
        operationDisplay.textContent = '';
        inputDisplay.textContent = '0';
    }
}

// Add click event listeners to score buttons
scoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove selected class from all buttons
        scoreButtons.forEach(btn => btn.classList.remove('selected'));
        // Add selected class to clicked button
        button.classList.add('selected');
        selectedPlayer = parseInt(button.dataset.player);
        updateDisplay()
    });
});

// Add click event listeners to calculator buttons
calcButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!selectedPlayer && selectedPlayer !== 0) return;

        const value = button.textContent;

        if (value === 'Reset') {
            scores.fill(0)
            scoreButtons.forEach(button => button.textContent = '0')
            currentInput = '';
            operation = '+';
            updateDisplay();
            return;
        }

        if (value === 'Back') {
            currentInput = '';
            resetOperation();
            updateDisplay();
            return;
        }

        if (value === 'Update') {
            if (operation && currentInput) {
                const num = parseInt(currentInput);
                if (operation === '+') {
                    scores[selectedPlayer] += num;
                } else if (operation === '-') {
                    scores[selectedPlayer] -= num;
                }
                scoreButtons[selectedPlayer].textContent = scores[selectedPlayer];
                currentInput = '';
                resetOperation();
                updateDisplay();
            }
            return;
        }

        if (value === '+' || value === '-') {
            operation = value;
            currentInput = '';
            updateDisplay();
            return;
        }

        // Handle number input
        if (!isNaN(value)) {
            currentInput += value;
            updateDisplay();
        }
    });
}); 
