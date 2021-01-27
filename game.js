function word() {
  var arrayWord=["абзац","аборт","забор"];
  var word = arrayWord[Math.floor(Math.random()*arrayWord.length)];
  return word;
}

function autofillcells() {
  var newword = word();
  newArr= newword.split('');
  var one = newArr[0];
  document.getElementById('Cell1131').innerHTML+=newArr[0];
  document.getElementById('Cell1232').innerHTML+=newArr[1];
  document.getElementById('Cell1333').innerHTML+=newArr[2];
  document.getElementById('Cell1434').innerHTML+=newArr[3];
  document.getElementById('Cell1535').innerHTML+=newArr[4];
}
var elem="";
var divClick=false;
var useletX; var useletY;
function Onclickconfirm() {
  var elemInput=document.getElementsByName("InputWord");

  for (var i = 0; i < elemInput.length; i++) {
     if (elemInput[i].value !==""){
       elem+=elemInput[i].value;
       if (elem.length===1) {
         //запомнить координату текущ буквы в глобальную переменную
         divClick=true;
         let index=(i+1)+''+1+''+(i+1);
         if (i>=0 && i<=4){document.getElementById('Cell'+index).innerHTML+=elem; useletX = 1; useletY = (i+1);}
         let index1 =(i+1)+''+2+''+((i+1)%5);
         if (i>=5 && i<=8){document.getElementById('Cell'+index1).innerHTML+=elem;useletX = 2; useletY =((i+1)%5) ;}
         let index2=(i+1)+''+25;
         if (i==9){document.getElementById('Cell'+index2).innerHTML+=elem;useletX = 2; useletY =5}
         let index3 =(i+1)+''+4+''+((i+1)%5);
         if (i>=15 && i<=18){document.getElementById('Cell'+index3).innerHTML+=elem;useletX = 4; useletY =((i+1)%5) ;}
         let index4=(i+1)+''+45;
         if (i===19){document.getElementById('Cell'+index4).innerHTML+=elem;useletX = 4; useletY =5;}
         let index5 =(i+1)+''+5+''+((i+1)%5);
         if (i>=20 && i<=23){document.getElementById('Cell'+index5).innerHTML+=elem;useletX = 5; useletY =((i+1)%5) ;}
         let index6=(i+1)+''+55;
         if (i===24){document.getElementById('Cell'+index6).innerHTML+=elem;useletX = 5; useletY =5;}

       } else {
         alert("eror");
       }

     }
  }
  divClick=false;
  elem="";
}
var newArrayWord='';
var oldX=-1; var oldY=-2;
var useletter = false;
var gamemode=1;//1 - вбиваем букву 2- накликиваем слово
function Onclick(x,y) {
  divClick=true;
if(gamemode!=2) return;
 if ((x==useletX && y==useletY) && oldX==-1 ) useletter=true; else{
if(!( (oldX==-1) || (Math.abs(oldX-x)==1&&(y==oldY)) || (Math.abs(oldY-y)==1&&(x==oldX) ))){
   alert("Выберите другую ячейку!");
   return;
}
}
oldX = x; oldY=y;
let elemDiv;
let i=0;
  if (divClick===true) {
    do{
      let index = (i+1)+''+x+''+y;
      i++;
     elemDiv= document.getElementById("Cell"+index);
   }while (elemDiv==null) ;
      if (elemDiv.innerText!=="") {

        newArrayWord=newArrayWord+elemDiv.innerText;

        console.log(newArrayWord);
      } else {
        alert("Пустооо!!");
      }
    }
  }

var currentArray =[];
function OnClickPod() {
 let wordTable = '';
    var found = arrayAllWord.findIndex(function(element) {
      return element ===newArrayWord ;
    });
   if (found == -1 )
   {
     if (useletter == false && (oldX == useletX && oldY ==useletY) ) useletter = true;
     if (useletter == true) {
       arrayAllWord.push(newArrayWord);
       currentArray.push(newArrayWord);
       console.log(currentArray);
       wordTable = newArrayWord + '  ' +newArrayWord.length+ ' , ';
       document.getElementById("tableWord").innerHTML+=wordTable;
     } else { alert ("Не выбрана новая буква");
      }
   } else alert("Нельзя собрать слово!!")


}
function OnClickNext() {
  gamemode =1;
  oldX = -1; oldY =-2;
  newArrayWord='';
  for (var i = 0; i < document.getElementsByName("InputWord").length; i++) {
    var elemvalue = document.getElementsByClassName("Cell")
    if (elemvalue[i].innerText=="" || useletter == false) {
     document.getElementById('IW'+(i+1)).style.display="block";
    }
    }
}
  function OnclickWord() {
    Onclickconfirm();
gamemode=2;
    var elemInput=document.getElementsByName("InputWord");
    for (var i = 0; i < elemInput.length; i++) {
      elem+=elemInput[i]+=elem;
      if (elem !=="") {
        //document.getElementsByName('InputWord').style.display="none";
       document.getElementById('IW'+(i+1)).style.display="none";
      }
      }
      elem="";
    }
function GameOver(){
  var elemInput=document.getElementsByClassName("Cell");
  for (var i = 0; i < elemInput.length; i++) {
  //  if (elemInput[i].textContent=='') { //Не ЗАБЫТЬ ИЗМЕНИТЬ!!!!
  //    alert("Соберите все слова!!");
  //    return;  }
  }
  document.getElementById("RecordName").style.display = "flex";

}
var namePlayer='';
function SavePlayer() {
  namePlayer = document.getElementById("PlayerName").value;

  document.getElementById("RecordName").style.display = "none";
  RecordCount();
}

function RecordCount() { //currentArray Пусть длинные слова > 3 wordTable через ' ' длина
  let countLen = 0;
  for(var i=0;i<currentArray.length;i++){
    if (currentArray[i].length>=3) {
      countLen+=1;
    }
  }

localStorage.setItem(namePlayer,countLen);
  namePlayer='';
}
function Newgame() {
  window.location.reload();
  let mass = [];
  let recordstring='';
  for(let i=0; i<10; i++) {
    let key = localStorage.key(i);
    mass[i] = `${key}: ${localStorage.getItem(key)}`
      recordstring+=mass[i]+"\n";
  }


  alert(recordstring);

}
autofillcells();
