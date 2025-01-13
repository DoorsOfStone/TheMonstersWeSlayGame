// class for weapons

class Weapon{
   constructor(id,name,attack,cost){
    this.name = name;
    this.id = id; 
    this.attack = attack;
    this.cost = cost;
   }

}
class Armor{
    constructor(id,name,def,cost){
        this.name = name;
        this.id = id;
        this.def = def;
        this.cost = cost;
    }
}

class Monster{
    constructor(id,name, type, health, attack, reward){
        this.name = name;
        this.id = id;
        this.type = type;
        this.health = health;
        this.attack = attack;
        this.reward = reward;
    }
}
class Character{
    constructor(id,name, health, gold){
        this.name = name;
        this.id = id;
        this.health = health;
        this.gold = gold;
    }
}

const weaponsArr = [
    new Weapon(1,"Sword",30,10),
    new Weapon(2,"Bow",40,30),
    new Weapon(3,"Steel Sword",60,150),
    new Weapon(4,"Staff Of Moses",200,300),
    new Weapon(5,"Shard Blade",250,500),
];

const armorArr = [
    new Armor(1,"Leather Plate", 20, 30),
    new Armor(2,"Steel Plate", 60, 90),
    new Armor(3,"Cloth Of Hope", 100, 150),
    new Armor(4,"Shard Plate", 200, 300),
];

const monsterArr = [
    new Monster(1,"Frirvintos, The Voiceless","Dragon",300,40,80),
    new Monster(2,"Yasamor, The Forgetful","Death Worm",400,60,150),
    new Monster(3,"Ulgran, The Souless","Demon",500,100,250),
    new Monster(4,"Meorr, The God Of Judgement","God",700,200,400),
];
document.addEventListener('DOMContentLoaded',()=>{
const shopScreen = document.querySelector('.shop-screen');
const mainScreen = document.querySelector('.main-screen');
const shopBtn = document.getElementById('shop-btn');
const exitBtn = document.getElementById('exit-btn');
const questBtn = document.getElementById('quest-btn');
const questScreen = document.querySelector('.quest-screen');
const modal = document.querySelector('.modal');
const messageBox = document.getElementById('message-content');
const goldDisplay = document.getElementById('gold')
const questGold = document.getElementById('quest-gold')
const playersInventoryContainer = document.querySelector('.player-inventory');
const attackBtn = document.getElementById('attack-btn');
const runBtn = document.getElementById('run-btn');
//const missAttack = getRandomRange(1,100);
const monsterHealth = document.getElementById('monster-health');
const monsterName = document.getElementById('monster-name-field');
let currentMonsterindex = 0;
let monsterHP = monsterArr[currentMonsterindex].health
let gold = 1000;
let inventory = [
    new Weapon(0,"Stick",10,0),
];
let selectedWeapon;


// open shop
shopBtn.addEventListener('click',()=>{
    mainScreen.style.display = 'none';
    shopScreen.style.display = 'flex';
    goldDisplay.innerText =  gold;
    const shopInventory = document.querySelector(".shop-inventory");
    playersInventoryContainer.innerHTML = ""
    shopInventory.innerHTML = ""
    const avaliableWeapons = weaponsArr.filter(weapon => !inventory.some(item => item.id === weapon.id))
   avaliableWeapons.forEach(weapon =>{
        const weaponCard = document.createElement('div');
        weaponCard.classList.add('weapon-card');
        weaponCard.innerHTML =  `
        <h1>${weapon.name}</h1>
        <p>Atk: ${weapon.attack}</p>
        <p>Cost: ${weapon.cost} Gold</p>
        <button id="buy-${weapon.id}"class="buy-btn">Buy</button>
        </div>
         `
        shopInventory.appendChild(weaponCard);
    const BuyWeaponBtn = document.getElementById(`buy-${weapon.id}`);
    //selling weapon
    // buying weapon
    BuyWeaponBtn.addEventListener('click',()=>{
       if(gold >= weapon.cost){
          gold -= weapon.cost;
          goldDisplay.innerText =  gold;
         inventory.push(weapon)
         updatePlayerInventory(playersInventoryContainer)
         weaponCard.remove();
       }else{
        alert("Not Enough Gold..")
         }
      })
    })
   updatePlayerInventory(playersInventoryContainer)
})
 // update player's inventory when purchasing a weapon from the shop
function updatePlayerInventory(container){
   container.innerHTML = "";
    inventory.forEach(item =>{
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card')
        itemCard.innerHTML = `
        
         <h1>${item.name}</h1>
         <p>Atk: ${item.attack}</p>
         <p>Cost: ${item.cost} Gold</p>
         <button id="sell-${item.id}"class="sell-btn">Sell</button>
        </div>
        `
      container.appendChild(itemCard);
    })
}
// exit shop 
exitBtn.addEventListener('click',()=>{
    mainScreen.style.display ='flex';
    shopScreen.style.display = 'none';
})

// quest button 
questBtn.addEventListener('click',()=>{
    mainScreen.style.display = 'none';
    questScreen.style.display = 'flex';
    questGold.innerText= gold;
    updateQuestInventory(document.querySelector('.quest-inventory'))
    if(messageBox){
       updateMessage(`Player has entered the battlefield..${monsterArr[0].name} awaits `)
    }
})
// cancel quest btn
document.getElementById('cancel-btn').addEventListener('click',()=>{
    mainScreen.style.display ='flex';
    questScreen.style.display = 'none';
})
// accept quest btn
document.getElementById('confirm-btn').addEventListener('click',()=>{
     modal.style.display = 'none'
     monsterHealth.textContent = monsterHP;
     monsterName.textContent = monsterArr[currentMonsterindex].name
    if(messageBox){
    updateMessage("Player has chosen to fight. Courage is the first step. Good Luck Warrior.")
    }

    })
// Miss attack generates random number between selected range
 function getRandomRange(min, max){
    
   return Math.random() * (max - min) + min
 }

// attacking function
attackBtn.addEventListener('click',()=>{
if(selectedWeapon){
 monsterHP -= selectedWeapon.attack;
 monsterHealth.innerText = monsterHP
 updateMessage(`Warrior attacked with his ${selectedWeapon.name}, ${selectedWeapon.attack} damage done.`)
 
}else{
    updateMessage("Please select a weapon before you attack.")
}
if(monsterHP <= 0){
    updateMonster()
}
})
// run fucntion
const run =()=>{
    // heads or tails to retreat
    //update message the player retreated
    // reveal main screen
}

// update monster after they are defeated
function updateMonster(){
   
     if(monsterHP <= 0 && monsterArr[currentMonsterindex] >= monsterArr.length -1){
        updateMessage("You have slayed all the monsters. Congrats you have won the game.")
       }else{
        updateMessage(`${monsterArr[currentMonsterindex].name} has been slain.`)
        currentMonsterindex++;
        monsterName.innerText = monsterArr[currentMonsterindex].name
        monsterHealth.innerText = monsterHP
        selectedWeapon = ''
       }
}
// function for handling message display in battlefeild
function updateMessage(message){
    let index = 0;
    // function to give that typing effect when displaying messages
    function type(){
    if(index < message.length){
      messageBox.textContent += message.charAt(index);
       index++ ;
       setTimeout(type, 50);
       
    }
    }
        messageBox.textContent = '';
        if(messageBox){
            type()
        }else{
            console.error("MessageBox element not found.")
        }
    }

// update player's inventory for Quest
function updateQuestInventory(container) { 
    container.innerHTML = ""; 
    inventory.forEach(item => { const itemCard = document.createElement('div');
    itemCard.classList.add('item-card');
     itemCard.innerHTML = 
     ` <h1>${item.name}</h1> 
     <p>Atk: ${item.attack}</p> 
     <button id="select-${item.id}" class="select-btn">Select</button> `
      container.appendChild(itemCard);
     document.getElementById(`select-${item.id}`).addEventListener('click', () => {
     selectedWeapon = item;
     updateMessage(`Selected weapon: ${item.name}`);
     }); 
    });
}
  updateQuestInventory(document.querySelector('.quest-inventory'));

})
