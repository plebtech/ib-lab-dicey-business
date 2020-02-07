console.log("Loading..");

function encapsulator() {
    let counter = 1;
    const container = document.getElementById("container");
    const GENERATE_BTN = document.getElementById("controls").querySelectorAll("button")[0];

    class Die {
        constructor() {
            this.div = document.createElement('div'); // creates div via DOM.
            this.div.className = 'die'; // assigned class to div.
            this.div.id = counter; // assigns id to div (based on counter value).
            this.value = this.roll(); // holds the roll.
            counter++;
            this.div.innerHTML = '<span>' + setFace(this.value) + '</span>';
            container.appendChild(this.div);
        }
        roll() {
            return (Math.floor(Math.random() * (7 - 1)) + 1);
        }
    }

    GENERATE_BTN.addEventListener('click', () => {
        new Die();
    });

    function setFace(value) {
        console.log(value);
        switch(value) {
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