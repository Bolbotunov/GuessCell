let cells = [...document.querySelectorAll('.cell')]
let btn = document.querySelector('.btns_wrapper')
let btnText = document.querySelector('.btns')


// ===============рандомный номер от 1-5===========
function randomize(min,max){
  let randomCell =Math.floor(Math.random() * (max - min + 1)) + min;
  return randomCell
}
let a = randomize(1,5)

cells.forEach((item)=>{
  item.addEventListener('click',function(){
    let selectCell = +item.innerHTML
if(a === selectCell){
  item.classList.add('win_cell')
} else{
  item.classList.add('lose_cell')
}
  })
})

function press(){
  btnText.textContent = btnText.textContent === 'new game' ? 'select cell' : 'new game';
  
  cells.forEach((item)=>{
    item.classList.toggle('change_color')
    item.classList.remove('win_cell')
    item.classList.remove('lose_cell')
  })
}

btn.addEventListener('click',press)
