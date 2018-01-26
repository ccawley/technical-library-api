let uuid = require('uuid/v4')
let fs = require('fs')

let data = [
  {
    id: uuid(),
    name: "Redwall",
    borrowed: false,
    description: "Redwall Abbey, tranquil home to a community of peace-loving mice, is threatened by Cluny the Scourge savage bilge rat warlord and his battle-hardened horde. But the Redwall mice and their loyal woodland friends combine their courage and strength.",
    authors: [{ id: uuid(), firstName: "Brian", lastName: "Jacques" }]
  },
  {
    id: uuid(),
    name: "Mossflower",
    borrowed: false,
    description: "The clever and greedy wildcat Tsarmina becomes ruler of all Mossflower Woods and is determined to govern the peaceful woodlanders with an iron paw. The brave mouse Martin and quick-talking mouse thief Gonff meet in the depths of Kotir Castle's dungeon. The two escape and resolve to end Tsarmina's tyrannical rule. Joined by Kinny the mole, Martin and Gonff set off on a dangerous quest for Salamandastron, where they are convinced that their only hope, Boar the Fighter, still lives.",
    authors: [{ id: uuid(), firstName: "Brian", lastName: "Jacques" }]
  },
  {
    id: uuid(),
    name: "Mattimeo",
    borrowed: false,
    description: "The third addition to the beloved Redwall series takes place during the summer of the Golden Plain. Preparation for a great feat are underway at Redwall Abbey, and the young mouse Mattimeo is contributing his share of the labors. But Mattimeo is the son of Mathius, the guardian of Redwall Abbey, and it is this fact that makes him the target of a fiendish kidnapping plot contrived by the vicious fox, Slagar the Cruel. When Mathias and his brave followers abandon heir homes and face enslavement for the return of their children, the captive Mattimeo stands to prove his worth--and an unexpected hero is born.",
    authors: [{ id: uuid(), firstName: "Brian", lastName: "Jacques" }]
  }
];

fs.writeFileSync('./data.json', JSON.stringify(data))
console.log(JSON.parse(fs.readFileSync('./data.json')))
