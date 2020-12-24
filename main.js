const skillBar = document.querySelector(".skill-bar");
const skillBarElems = document.querySelectorAll(".skill-bar > *");
const cooldownCounterDiv = document.querySelector(".cooldown-counter");
const combatLog = document.querySelector(".combat-log");

const skillType = { attack: "attack", defence: "defence" };

class Skill {
  constructor(name, skillType, cooldown, url) {
    this.name = name;
    this.skillType = skillType;
    this.cooldown = cooldown;
    this.url = url;
  }
}

const skills = [
  new Skill(
    "lightning strike",
    skillType.attack,
    2,
    "./images/SpellBook01_13.png"
  ),
  new Skill("fireblast", skillType.attack, 1, "./images/SpellBook01_17.png"),
  new Skill("frost", skillType.attack, 4, "./images/SpellBook01_78.png"),
  new Skill("blizzard", skillType.attack, 5, "./images/SpellBook01_87.png"),
  new Skill("poison", skillType.attack, 2, "./images/SpellBook01_95.png"),
];

function addBackgroundImage(element, index) {
  const url = skills[index].url;
  element.style.backgroundImage = `url('${url}')`;
  element.dataset.index = index;
}

const printSkillUse = (skill) => {
  combatLog.textContent = `Casting ${skill.name}...`;
};

function skillClicked(e) {
  const skill = e.target;
  const createdCoolDownDiv = addCooldownEffect(skill);
  const usedSkill = skills[skill.dataset.index];
  printSkillUse(usedSkill);
  const cooldown = usedSkill.cooldown;
  console.log("cd: ", cooldown);
  const cooldownCounter = createdCoolDownDiv.parentElement.querySelector(".cooldown-counter");
  removeCooldownEffect(createdCoolDownDiv, cooldownCounter, cooldown);
}

skillBarElems.forEach((skill, indx) => {
  addBackgroundImage(skill, indx);
  skill.addEventListener("click", skillClicked);
});

/* CoolDown */
function addCooldownEffect(element) {
  const div = document.createElement("div");
  div.classList.add("on-cooldown");
  element.append(div);
  return div;
}

const removeCooldownEffect = async (element, cooldownCounter, cooldownTime) => {
  let timer = cooldownTime;
  for (let i = 0; i < cooldownTime; i++) {
    printCoolDown(cooldownCounter, timer);
    timer--;
    await sleep(1000);
  }
  cooldownCounter.textContent = "";
  element.remove();
};

function printCoolDown(cooldownCounter, timeLeft) {
  console.log(`time left: ${timeLeft}`);
  cooldownCounter.textContent = timeLeft;
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
