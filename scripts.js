console.log("Loading..");

function encapsulator() {
    let counter = 1;
    const btn = document.getElementById("generate").querySelector("button");

    class Die {
        constructor() {
            this.value;
        }
        roll() {
            this.value = dieValueRandom();
        }
    }

    btn.addEventListener("click", () => {

    };

    function dieValueRandom() {
        return (Math.floor(Math.random() * (7 - 1)) + 1);
    }
}

encapsulator();

console.log("Loaded.");