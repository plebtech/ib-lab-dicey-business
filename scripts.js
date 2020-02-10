console.log("Loading..");
// 'encapsulator' obfuscates variables from window access.
function encapsulator() {
    const CONTAINER = document.getElementById("container"),
    GENERATE_BTN = document.getElementById("controls").querySelectorAll("button")[0],
    REROLL_BTN = document.getElementById("controls").querySelectorAll("button")[1],
    SUM_BTN = document.getElementById("controls").querySelectorAll("button")[2],
    LOG_BTN = document.getElementById("controls").querySelectorAll("button")[3],
    STATUS = document.getElementById("status");
    let counter = 1, // starts at 1, incremented AFTER die object is created.
        dice = []; // empty array, dice pushed to it as they are created.

    class Die {
        constructor() {
            this.div = document.createElement('div'); // create div via DOM.
            this.div.classList.add('die'); // assign class to div.
            this.div.id = counter; // assign id to div (based on counter value).
            this.value; // initialize value (to hold die face).
            CONTAINER.appendChild(this.div);
            this.animate();
            counter++;
            dice.push(this);
            this.listen();
        }
        // 'rolls' dice for one second before settling on final value.
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
        // call function to generate a random die value (1-6) and 
        roll(min = 1, max = 6) {
            let r = randomDieVal(min, max);
            this.value = r;
            this.div.innerHTML = '<span>' + setFace(this.value) + '</span>';
        }
        // listeners for each die (click, double-click/right-click).
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

    // button listeners.
    GENERATE_BTN.addEventListener('click', () => {
        new Die(); // instantiates Die class.
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

    // sets noun based on # of existing dice (single die vs multiple dice).
    function setNoun() {
        let n;
        if (dice.length === 1) {
            n = 'die';
        } else if (dice.length > 1) {
            n = 'dice';
        }
        return n;
    }

    // return random value between 1 and 6, inclusive.
    // use of Math.floor(Math.random()) requires formula of ((max+1) - min) + min) because Math.random() generates [0, 1). i.e. generates EXCLUSIVE of 1 and will never return 1.
    function randomDieVal(min, max) {
        let val = Math.floor(Math.random() * ((max + 1) - min) + min);
        // console.log(val);
        return val;
    }

    // returns ascii code for the die 'face' based on random generated value (1 through 6).
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

    // when a die is removed, reassign div IDs based on number of dice left, and reset counter to number of dice.
    function reorderDice() {
        let x = 0;
        dice.forEach(die => {
            die.div.id = x;
            x++;
        });
        counter = dice.length;
    }
}

// run the encapsulating function.
encapsulator();
console.log("Loaded."); // if you see this, no errors!