console.log("Loading..");

function encapsulator() {
    const CONTAINER = document.getElementById("container");
    const GENERATE_BTN = document.getElementById("controls").querySelectorAll("button")[0];
    const REROLL_BTN = document.getElementById("controls").querySelectorAll("button")[1];
    const SUM_BTN = document.getElementById("controls").querySelectorAll("button")[2];
    const LOG_BTN = document.getElementById("controls").querySelectorAll("button")[3];
    const STATUS = document.getElementById("status");
    let counter = 1;
    let dice = [];

    class Die {
        constructor() {
            this.div = document.createElement('div'); // creates div via DOM.
            this.div.className = 'die'; // assigned class to div.
            this.div.id = counter; // assigns id to div (based on counter value).
            this.value;
            CONTAINER.appendChild(this.div);
            this.animate();
            counter++;
            dice.push(this);
            this.listen();
        }
        animate(limit = 1000) {
            let start = Date.now();
            let timer = setInterval(function () {
                let timePassed = Date.now() - start;
                if (timePassed >= limit) {
                    clearInterval(timer);
                    return;
                }
                this.roll();
            }.bind(this), 100);
        }
        roll() {
            let r = randomDieVal();
            this.value = r;
            this.div.innerHTML = '<span>' + setFace(this.value) + '</span>';
        }
        listen() {
            this.div.addEventListener('click', () => {
                this.animate();
                STATUS.innerHTML = `<span>Selected die rerolled</span>`;
            });
            this.div.addEventListener('dblclick', () => {
                this.div.remove();
                let rIndex = dice.indexOf(this);
                dice.splice(rIndex, 1);
                reorderDice();
                STATUS.innerHTML = `<span>Selected die removed</span>`;
            });
            this.div.addEventListener('contextmenu', () => {
                this.div.remove();
                let rIndex = dice.indexOf(this);
                dice.splice(rIndex, 1);
                reorderDice();
                STATUS.innerHTML = `<span>Selected die removed</span>`;
            });
        }
    }

    GENERATE_BTN.addEventListener('click', () => {
        new Die();
        let noun = setNoun();
        STATUS.innerHTML = `<span>Number of ${noun}: ${dice.length}</span>`;
    });

    REROLL_BTN.addEventListener('click', () => {
        if (dice.length === 0) {
            STATUS.innerHTML = `<span>NO DICE</span>`;
            return;
        } else dice.forEach(die => {
            die.animate(1000);
            let noun = setNoun();
            STATUS.innerHTML = `<span>${dice.length} ${noun} rerolled</span>`;
        })
    });

    SUM_BTN.addEventListener('click', () => {
        if (dice.length === 0) {
            STATUS.innerHTML = `<span>NO DICE</span>`;
            return;
        } else {
            let sum = 0;
            let noun = setNoun();
            dice.forEach(die => {
                sum += die.value;
            });
            STATUS.innerHTML = `<span>Sum of ${noun}: ${sum}</span>`;
        }
    });

    // LOG_BTN.addEventListener('click', () => {
    //     console.log(dice);
    // })

    function setNoun() {
        let n;
        if (dice.length === 1) {
            n = 'die';
        } else if (dice.length > 1) {
            n = 'dice';
        }
        return n;
    }

    function randomDieVal() {
        return Math.floor(Math.random() * (7 - 1)) + 1;
    }

    function setFace(value) {
        switch (value) {
            case 1:
                return '\u2680';
            case 2:
                return '\u2681';
            case 3:
                return '\u2682';
            case 4:
                return '\u2683';
            case 5:
                return '\u2684';
            case 6:
                return '\u2685';
        }
    }

    function reorderDice() {
        let x = 0;
        dice.forEach(die => {
            die.div.id = x;
            x++;
        });
        counter = dice.length;
    }
}

encapsulator();


console.log("Loaded.");