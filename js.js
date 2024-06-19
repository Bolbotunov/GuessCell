let cells = [...document.querySelectorAll('.cell')]
let btn = document.querySelector('.btns_wrapper')
let btnText = document.querySelector('.btns')
let infoAttempts = document.querySelector('.info_attempts')
let countWins = document.querySelector('.count_wins')
let countLoses = document.querySelector('.count_loses')
let attempts
let wins = 0
let loses = 0


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

// блокировка всех кнопок
function blockBtn(){
  cells.forEach((item)=>{
    item.style.pointerEvents='none'
    item.classList.add('change_color')
    item.classList.remove('win_cell')
    item.classList.remove('lose_cell')
  })
}
// разблокировка всех кнопок
function openBtn(){
  cells.forEach((item)=>{
    item.style.pointerEvents='auto'
    item.classList.remove('change_color')
    item.classList.remove('win_cell')
    item.classList.remove('lose_cell')
  })
}


// количество попыток за которые угадана ячейка
function winAttemps(){
   attempts = 0
  return function(){
    return attempts += 1
  }
}
let timeWinAttempts = winAttemps()


countLoses.textContent = loses
countWins.textContent = wins



//  условия при победе ячейки и надписи к этим условиям
let a
cells.forEach((item)=>{
  item.addEventListener('click',function(){
    timeWinAttempts()
    let selectCell = +item.innerHTML
    if(a === selectCell){
        item.classList.add('win_cell')
        infoAttempts.textContent = `Ячейка угадана с ${attempts} попытки. Сыграем еще?`
        wins+=1
        countWins.textContent = wins
        cells.forEach((item)=>{
          item.style.pointerEvents='none'
     btnText.textContent = 'new game'
   })
  }else{
      item.classList.add('lose_cell')
  item.style.pointerEvents='none'
      if(attempts === 3){
      loses+=1
      countLoses.textContent = loses
      infoAttempts.textContent = `Попытки закончились!Начните заново!`
      
       cells.forEach((item)=>{
    item.style.pointerEvents='none'
    
  })
       btnText.textContent = 'new game'
  }else{
    infoAttempts.textContent = `Осталось попыток: ${3-attempts}`
  }
}
  })
})

// нажатие на "новая игра" и "сброс"
function press(){
    let attempts = 3
  a = randomize(1,5)
  console.log(a)
  if(btnText.textContent === 'new game'){
    btnText.textContent = 'select cell'
    openBtn()
  }else{
    btnText.textContent = 'new game'
    blockBtn()
      }
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

// console.log(wins,loses)

// statWins.textContent = localStorage.getItem('wins')
// statLoses.textContent = localStorage.getItem('loses')

// localStorage.clear();
