class Calculadora {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    AppendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case'+': 
                computation = prev + current
                break;
            case'-': 
                computation = prev - current
                break;
             case'*': 
                computation = prev * current
                break;
            case'÷': 
                computation = prev / current
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0]) 
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(intergerDigits)){
            intergerDisplay = ''
        }else{
            intergerDisplay = intergerDigits.toLocaleString('en', {maximumFractionDigits:0})
        }
        if(decimalDigits != null){
            return `${intergerDisplay}.${decimalDigits}`
        }else{
            return intergerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText= this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText= `${ this.getDisplayNumber(this.previousOperand)} ${this.operation}`

        }else{
            this.previousOperandTextElement.innerText = ''
        }

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const DeleteButton = document.querySelector('[data-delete]');
const ACButton = document.querySelector('[data-AC]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculadora = new Calculadora(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculadora.AppendNumber(button.innerText)
        calculadora.updateDisplay()
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculadora.chooseOperation(button.innerText)
        calculadora.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
        calculadora.compute()
        calculadora.updateDisplay()
})

ACButton.addEventListener('click', button =>{
    calculadora.clear()
    calculadora.updateDisplay()
})

DeleteButton.addEventListener('click', button =>{
    calculadora.delete()
    calculadora.updateDisplay()
})