<footer>
    <div class="menu"> 
        <ul class="menu-block">
            <li class="menu-header">ABILITIES</li>
            <li class="menu-item"><a href="#" id="ability1">➕ Reveal 3 bombs</a></li>
            <li class="menu-item"><a href="#" id="ability2">➕ 3 safe clicks</a></li>
            <li class="menu-item"><a href="#" id="ability3">➕ Open field</a></li>
            <img src="<?php echo get_template_directory_uri(); ?>/images/spliiter_line.png" alt="Splitter Line">
            <li class="menu-header">TASKS</li>
            <li class="menu-item" id="task1">❌ Reach 1000 score</li>
            <li class="menu-item" id="task2">❌ Collect 30 beans</li>
            <li class="menu-item" id="task3">❌ Win using no abs</li>
            <img src="<?php echo get_template_directory_uri(); ?>/images/spliiter_line.png" alt="Splitter Line">
            <li class="menu-header">INFO</li>
            <li class="menu-item" id="info1">🎖️ Best score: 0</li>
            <li class="menu-item" id="info2">⛏️ Blocks dug: 0</li>
            <li class="menu-item" id="info3">🏆 Games won: 0</li>
        </ul>
    </div>
    <div class="game"> 
        <div class="game-bar">
            <ul class="game-bar-list">
                <li class="game-bar-item">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/flag.png" alt="Flag">
                    <div id="mines-remaining">10</div>
                </li>
                <li class="game-bar-item">SCORE: 
                    <span id="score">0</span>
                </li>
                <li class="game-bar-item">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/bean.png" alt="Bean">
                    <div id="beans">0</div>
                </li>
            </ul>
        </div>
        <div id="minesweeper-grid" class="minesweeper-grid"></div>
    </div>
    <div class="help-block" id="help-block">
        <div class="help-container">
            <div class="help-bar">
                <div>🎯 Мета гри: Знайти всі бомби, не вибухнувши жодної з них.</div>
                <div>🚩 Прапорці: Ви можете помітити потенційні місця, де можуть знаходитися бомби, ставлячи прапорці. Поставте прапорець на клітинку, яку ви вважаєте бомбою, натиснувши на неї правою кнопкою миші.</div>
                <div>💣 Бомби: У грі розміщені певна кількість бомб. Ваша мета - уникнути їх під час гри. Якщо ви клікнете на клітинку з бомбою, гра закінчиться поразкою.</div>
                <div>🔢 Підказки: Кожна цифра, яка відображається на клітинці, вказує на кількість бомб, що оточують цю клітинку (включаючи діагональні). Використовуйте ці числа для визначення потенційно безпечних клітинок.</div>
                <div>🏆 Перемога: Якщо ви позначите всі бомби прапорцями та не натрапите на жодну з них під час гри, ви переможете.</div>
            </div> 
        </div>
    </div>
    <div class="options-block" id="options-block">
        <div class="options-container">
            <div class="options-bar">
                <div>
                    <label for="grid-width">Width : </label>
                    <input type="number" id="grid-width" name="grid-width" min="5" max="30" value="10">
                </div>
                <div>
                    <label for="grid-height">Height: </label>
                    <input type="number" id="grid-height" name="grid-height" min="5" max="30" value="10">
                </div>
                <div>
                    <label for="bomb-amount">Bombs : </label>
                    <input type="number" id="bomb-amount" name="bomb-amount" min="1" max="99" value="20">
                </div>
                <button id="apply-settings">Apply</button>
            </div>
        </div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>