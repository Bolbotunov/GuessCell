let cells = [...document.querySelectorAll('.cell')]
let btn = document.querySelector('.btns_wrapper')
let btnText = document.querySelector('.btns')
let infoAttempts = document.querySelector('.info_attempts')
let attempts

// блокировка всех кнопок
function blockBtn(){
  cells.forEach((item)=>{
    item.style.pointerEvents='none'
  })
}
// разблокировка всех кнопок
function openBtn(){
  cells.forEach((item)=>{
    item.style.pointerEvents='auto'
  })
}

// рандомная ячейка победитель
function randomize(min,max){
  let randomCell =Math.floor(Math.random() * (max - min + 1)) + min;
  return randomCell
}

// количество оставшихся попыток
function counterAttemps(){
  attempts = 3
  return function(){
    return attempts -= 1
  }
}
let remainAttempts = counterAttemps()


// количество попыток за которые угадана ячейка
function winAttemps(){
   attempts = 0
  return function(){
    return attempts += 1
  }
}
let timeWinAttempts = winAttemps()


//  условия при победе ячейки и надписи к этим условиям
let a
cells.forEach((item)=>{
  item.addEventListener('click',function(){
    timeWinAttempts()
    let selectCell = +item.innerHTML
    if(a === selectCell){
        item.classList.add('win_cell')
  win()
  }else{
  item.classList.add('lose_cell')
  item.style.pointerEvents='none'
    if(attempts === 3){
      infoAttempts.textContent = `Попытки закончились!Начните заново!`
      blockBtn()
    newGame()
  }else{
    infoAttempts.textContent = `Осталось попыток: ${3-attempts}`
  }
}
  })
})


function win(){
   infoAttempts.textContent = `Ячейка угадана с ${attempts} попытки. Сыграем еще?`
      cells.forEach((item)=>{
     item.style.pointerEvents='none'
     item.classList.toggle('change_color')
     btnText.textContent = 'new game'
   })
   
}

function newGame(){
  btnText.textContent = btnText.textContent === 'new game' ? 'select cell' : 'new game';
  btn.addEventListener('click',function(){
    cells.forEach((item)=>{
    item.style.pointerEvents='auto'
    item.classList.add('change_color')
    item.classList.remove('win_cell')
    item.classList.remove('lose_cell')
  })
  })
}


// нажатие на "новая игра" и "сброс"
function press(){
   openBtn()
  let attempts = 3
  a = randomize(1,5)
  console.log(a)
  btnText.textContent = btnText.textContent === 'new game' ? 'select cell' : 'new game';
  remainAttempts = counterAttemps()
  timeWinAttempts = winAttemps()
  infoAttempts.textContent = `Осталось попыток: ${attempts}`
  cells.forEach((item)=>{
    item.classList.toggle('change_color')
    item.classList.remove('win_cell')
    item.classList.remove('lose_cell')
  })
}
btn.addEventListener('click',press)
