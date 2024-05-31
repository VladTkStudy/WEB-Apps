document.addEventListener('DOMContentLoaded', () => {
    //#region elements
    const grid = document.getElementById('minesweeper-grid');
    const scoreDisplay = document.getElementById('score');
    const minesRemainingDisplay = document.getElementById('mines-remaining');
    const beanDisplay = document.getElementById('beans');
    const playButton = document.getElementById('play-button');
    const shopButton = document.getElementById('shop-button');
    const itemsButton = document.getElementById('items-button');
    const optionsButton = document.getElementById('options-button');
    const helpButton = document.getElementById('help-button');
    const helpBlock = document.getElementById('help-block');
    const optionsBlock = document.getElementById('options-block');
    const ability1 = document.getElementById('ability1');
    const ability2 = document.getElementById('ability2');
    const ability3 = document.getElementById('ability3');
    const task1 = document.getElementById('task1');
    const task2 = document.getElementById('task2');
    const task3 = document.getElementById('task3');
    const info1 = document.getElementById('info1');
    const info2 = document.getElementById('info2');
    const info3 = document.getElementById('info3');
    const applySettingsButton = document.getElementById('apply-settings');
    const gridWidthInput = document.getElementById('grid-width');
    const gridHeightInput = document.getElementById('grid-height');
    const bombAmountInput = document.getElementById('bomb-amount');
    //#endregion

    let width = parseInt(gridWidthInput.value);
    let height = parseInt(gridHeightInput.value);
    let bombAmount = parseInt(bombAmountInput.value);

    let task1Completed, task2Completed, task3Completed;
    let usedAbility1, usedAbility2, usedAbility3;
    let squares, flags, score, beans;
    let isGameOver;
    let bestScore = localStorage.getItem('bestScore') || 0;
    let totalCellsDug = localStorage.getItem('totalCellsDug') || 0;
    let totalWins = localStorage.getItem('totalWins') || 0;

    ability1.addEventListener('click', useAbility1);
    ability2.addEventListener('click', useAbility2);
    ability3.addEventListener('click', useAbility3);
    playButton.addEventListener('click', createBoard);
    optionsButton.addEventListener('click', () => {
        helpBlock.style.display = 'none';
        optionsBlock.style.display = 'block';
    });
    helpButton.addEventListener('click', () => {
        optionsBlock.style.display = 'none';
        helpBlock.style.display = (helpBlock.style.display === 'block') ? 'none' : 'block';
    });
    applySettingsButton.addEventListener('click', applySettings);
    createBoard();
    
    function updateGameText() {
        info1.textContent = `🎖️ Best score: ${bestScore}`;
        info2.textContent = `⛏️ Blocks dug: ${totalCellsDug}`;
        info3.textContent = `🏆 Games won: ${totalWins}`;
        task1.innerHTML = task1Completed === true ? "✅ Reach 1000 score" : "❌ Reach 1000 score";
        task2.innerHTML = task2Completed === true ? "✅ Collect 30 beans" : "❌ Collect 30 beans";
        task3.innerHTML = task3Completed === true ? "✅ Win using no abs" : "❌ Win using no abs";
        ability1.innerHTML = usedAbility1 === true ? "➖ Reveal 3 bombs" : "➕ Reveal 3 bombs";
        ability2.innerHTML = usedAbility2 === true ? "➖ 3 safe clicks" : "➕ 3 safe clicks";
        ability3.innerHTML = usedAbility3 === true ? "➖ Open field" : "➕ Open field";
        scoreDisplay.innerHTML = score;
        beanDisplay.innerHTML = beans;
        minesRemainingDisplay.innerHTML = bombAmount;
    }

    function resetGameValues() {
        grid.innerHTML = '';
        task1Completed = false;
        task2Completed = false;
        task3Completed = false;
        usedAbility1 = false;
        usedAbility2 = false;
        usedAbility3 = false;
        isGameOver = false;
        squares = [];
        flags = 0;
        score = 0;
        beans = 0;
        helpBlock.style.display = 'none';
        optionsBlock.style.display = 'none';
    }
    
    function createBoard() {
        resetGameValues();
        updateGridStyle();
        updateGameText();

        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * height - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * height; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);

            square.addEventListener('click', function (e) {
                click(square);
            });

            square.oncontextmenu = function (e) {
                e.preventDefault();
                addFlag(square);
            };
        }

        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = i % width === 0;
            const isRightEdge = i % width === width - 1;

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
                if (i > width - 1 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
                if (i > width && squares[i - width].classList.contains('bomb')) total++;
                if (i > width + 1 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
                if (i < width * height - 1 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
                if (i < width * height - width - 1 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
                if (i < width * height - width && squares[i + width].classList.contains('bomb')) total++;
                if (i < width * height - width - 2 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;
                squares[i].setAttribute('data', total);
            }
        }
    }

    function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
                minesRemainingDisplay.innerHTML = bombAmount - flags;
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
                minesRemainingDisplay.innerHTML = bombAmount - flags;
            }
        }
        checkForWin();
    }

    function click(square) {
        if(square == null) {
            return;
        }
        let currentId = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
        if (square.classList.contains('bomb')) {
            gameOver(square);
        } else {
            let total = square.getAttribute('data');
            if (total != 0) {
                square.classList.add('checked');
                square.innerHTML = total;
                score = parseInt(score + (10 + beans) * (bombAmount / 10));
                beans++;
                totalCellsDug++;
                checkTaskCompletions();

                localStorage.setItem('totalCellsDug', totalCellsDug);
                scoreDisplay.innerHTML = score;
                beanDisplay.innerHTML = beans;
                updateGameText();
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add('checked');
        totalCellsDug++;
        localStorage.setItem('totalCellsDug', totalCellsDug);
        updateGameText();
    }

    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width) {
                const newId = squares[parseInt(currentId - width)].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width + 1 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * height - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * height - width - 1 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * height - width) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * height - width - 2 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }

    function gameOver(square) {
        isGameOver = true;
        
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣';
                square.classList.remove('bomb');
                square.classList.add('checked');
            }
        });
    }
    
    function checkForWin() {
        let matches = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++;
            }
        }

        if (matches === bombAmount) {
            alert('Victory!');
            totalWins++;
            localStorage.setItem('totalWins', totalWins);
            isGameOver = true;
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScore', bestScore);
            }
            updateGameText();
        }
    }

    function useAbility1() {
        if(usedAbility1 === true) {
            return;
        }
        usedAbility1 = true;

        let placedFlags = 0;
        squares.forEach(square => {
            if (square.classList.contains('bomb') && !square.classList.contains('flag') && placedFlags < 3) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
                placedFlags++;
            }
        });

        checkForWin();
        updateGameText();
    }

    function useAbility2() {
        if(usedAbility2 === true) {
            return;
        }
        usedAbility2 = true;
        
        let safeCells = squares.filter(square => square.classList.contains('valid') && !square.classList.contains('checked'));
        for(i = 0; i <= 3; i++) {
            let randomSafeCell = safeCells[Math.floor(Math.random() * safeCells.length)];
            click(randomSafeCell);
        }

        checkForWin();
        updateGameText();
    }
    
    function useAbility3() {
        if(usedAbility3 === true) {
            return;
        }
        usedAbility3 = true;
        
        let safeCells = squares.filter(square => square.classList.contains('valid') && !square.classList.contains('checked') && square.getAttribute("data") == 0);
        let randomSafeCell = safeCells[Math.floor(Math.random() * safeCells.length)];
        click(randomSafeCell);
        
        checkForWin();
        updateGameText();
    }

    function applySettings() {
        width = parseInt(gridWidthInput.value);
        if(width > 17) {
            width = 17;
        }
        if(width < 3) {
            width = 3;
        }
    
        height = parseInt(gridHeightInput.value);
        if(height > 10) {
            height = 10;
        }
        if(height < 3) {
            height = 3;
        }
    
        bombAmount = parseInt(bombAmountInput.value);
        if(bombAmount > width * height - 5) {
            bombAmount = width * height - 5;
        }
        if(bombAmount < 1) {
            bombAmount = 1;
        }
    
        optionsBlock.style.display = 'none';
        createBoard();
    }

    function updateGridStyle() {
        grid.style.gridTemplateColumns = `repeat(${width}, 40px)`;
    }

    function checkTaskCompletions() {
        if (score >= 1000 && task1Completed === false) {
            score += 500;
            task1Completed = true;
        }
        if (beans >= 30 && task2Completed === false) {
            score += 500;
            task2Completed = true;
        }
        if(usedAbility1 === false && usedAbility2 === false && usedAbility3 === false && task3Completed === false && isGameOver === true) {
            score += 3000;
            task3Completed = true;
        }
        updateGameText();
    }
});