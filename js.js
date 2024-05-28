let cells = [...document.querySelectorAll('.cell')]
let btn = document.querySelector('.btns_wrapper')
let btnText = document.querySelector('.btns')
let infoAttempts = document.querySelector('.info_attempts')

let attempts = 3
function counterAttemps(){
  attempts = 3
  return function(){
    return attempts -= 1
  }
}
let remainAttempts = counterAttemps()

function winAttemps(){
  let attempts = 0
  return function(){
    return attempts += 1
  }
}
let timeWinAttempts = winAttemps()

function randomize(min,max){
  let randomCell =Math.floor(Math.random() * (max - min + 1)) + min;
  return randomCell
}

let a
cells.forEach((item)=>{
  item.addEventListener('click',function(){
    let selectCell = +item.innerHTML
    
if(a === selectCell){
  item.classList.add('win_cell')
   infoAttempts.textContent = `Ячейка угадана с ${attempts-remainAttempts()} попытки`
} else{
  item.classList.add('lose_cell')
  infoAttempts.textContent = `Осталось попыток: ${remainAttempts()}`
}
  })
})

function press(){
  a = randomize(1,5)
  btnText.textContent = btnText.textContent === 'new game' ? 'select cell' : 'new game';
  remainAttempts = counterAttemps()
  infoAttempts.textContent = `Осталось попыток: ${attempts}`
  cells.forEach((item)=>{
    item.classList.toggle('change_color')
    item.classList.remove('win_cell')
    item.classList.remove('lose_cell')
  })
}
btn.addEventListener('click',press)
