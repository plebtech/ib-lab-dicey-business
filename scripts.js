console.log("Loading..");

function encapsulator() {
    const container = document.getElementById("container");
    const GENERATE_BTN = document.getElementById("controls").querySelectorAll("button")[0];
    const REROLL_BTN = document.getElementById("controls").querySelectorAll("button")[1];
    const SUM_BTN = document.getElementById("controls").querySelectorAll("button")[2];
    let counter = 1;
    let dice = [];

    class Die {
        constructor() {
            this.div = document.createElement('div'); // creates div via DOM.
            this.div.className = 'die'; // assigned class to div.
            this.div.id = counter; // assigns id to div (based on counter value).
            this.animate(1000);
            counter++;
            dice.push(this);
        }
        animate(limit) {
            container.appendChild(this.div);
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
    }

    GENERATE_BTN.addEventListener('click', () => {
        new Die();
        let noun = setNoun();
        document.getElementById('status').innerHTML = `<span>Number of ${noun}: ${dice.length}</span>`;

    });
    
    REROLL_BTN.addEventListener('click', () => {
        dice.forEach((die) => {
            die.animate(1000);
        })
        let noun = setNoun();
        document.getElementById('status').innerHTML = `<span>${dice.length} ${noun} rerolled</span>`;
    });

    SUM_BTN.addEventListener('click', () => {
        let sum = 0;
        dice.forEach((die) => {
            sum+= die.value;
        });
        document.getElementById('status').innerHTML = `<span>Sum: ${sum}</span>`;
    });

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
}

encapsulator();

console.log("Loaded.");