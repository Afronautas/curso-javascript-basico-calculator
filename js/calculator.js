"use strict"

class Calculator {
    constructor() {
        this.init()
    }

    init() {
        this.audio = new Audio("./../assets/audio.wav")
        this.inputEl = document.querySelector(".value")
        this.btnEls = document.querySelectorAll(".num")
        this.btnEls.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.playAudio()
                const btnValue = btn.dataset.value
                if(!isNaN(btnValue)) {
                    this.inputEl.value += btnValue
                    return
                }

                switch(btnValue) {
                    case 'c':
                        this.reset()
                        break
                    case '=':
                        this.setEqualOperator()
                        break
                    case '*':
                    case '/':
                    case '+':
                    case '-':
                        this.setOperator(btnValue)
                        break
                }
            })
        })

        document.addEventListener('keyup', (e) => {
            const key = e.key
            switch (key) {
                case 'Escape':
                    this.playAudio()
                    this.reset()
                    break
                case 'Backspace':
                    this.playAudio()
                    this.inputEl.value = this.inputEl.value.substring(0, this.inputEl.value.length - 1)
                    break
                case 'Enter':
                    this.playAudio()
                    this.setEqualOperator()
                    break
                case '*':
                case '/':
                case '+':
                case '-':
                    this.playAudio()
                    this.setOperator(key)
                    break
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.playAudio()
                    this.inputEl.value += key
                    break

            }
        })
    }

    setEqualOperator() {
        if (!this.num2) {
            this.num2 = Number(this.inputEl.value)
        }
        this.clearScreen()
        this.calculate()
    }

    setOperator(operator) {
        this.num2 = null
        this.num1 = Number(this.inputEl.value)
        this.operator = operator
        this.clearScreen()
    }

    clearScreen() {
        this.inputEl.value = ""
    }

    reset() {
        this.num1 = null
        this.num2 = null
        this.result = null
        this.operator = null
        this.clearScreen()
    }

    calculate() {
        //this.inputEl.value = eval(`${this.num1}${this.operator}${this.num2}`)
        switch(this.operator) {
            case '*':
                this.result = this.result ? this.result * this.num2 : this.num1 * this.num2
                break
            case '/':
                this.result = this.result ? this.result / this.num2 : this.num1 / this.num2
                break
            case '+':
                this.result = this.result ? this.result + this.num2 : this.num1 + this.num2
                break
            case '-':
                this.result = (this.result == 0 || this.result) ? this.result - this.num2 : this.num1 - this.num2
                break
        }

        this.inputEl.value = this.result
    }

    playAudio() {
        this.audio.currentTime = 0
        this.audio.play()
    }
}

new Calculator()