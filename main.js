const skillBar = document.querySelector('.skill-bar');
const skillBarElems = document.querySelectorAll('.skill-bar > *');
const cooldownCounterDiv = document.querySelector('.cooldown-counter');
const cooldownCounter = document.querySelector('.cooldown-counter');
const combatLog = document.querySelector('.combat-log');


const skillType = { attack: "attack", defence: "defence" };

class Skill {
  constructor(name, skillType, url) {
    this.name = name;
    this.skillType = skillType;
    this.url = url;
  }
}

const skills = [
  new Skill('lightning strike', skillType.attack, './images/SpellBook01_13.png'),
  new Skill('fireblast', skillType.attack, './images/SpellBook01_17.png'),
  new Skill('frost', skillType.attack, './images/SpellBook01_78.png'),
  new Skill('blizzard', skillType.attack, './images/SpellBook01_87.png'),
  new Skill('poison', skillType.attack, './images/SpellBook01_95.png'),
]


function skillClicked(e) {
  console.log('clicked');
  const skill = e.target;
  const createdCoolDownDiv = addCooldownEffect(skill);
  setTimeout(() => removeCooldownEffect(createdCoolDownDiv), 1000);
}

console.log(skillBarElems)
skillBarElems.forEach(skill => {
  skill.addEventListener('click', skillClicked)
});

function addCooldownEffect(element) {
  const div = document.createElement('div');
  div.classList.add('on-cooldown')
  element.append(div);
  return div;
}

function removeCooldownEffect(element) {
  element.remove();
}