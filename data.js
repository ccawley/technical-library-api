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
    name: "The Talisman",
    borrowed: false,
    description: "On a brisk autumn day, a twelve-year-old boy stands on the shores of the gray Atlantic, near a silent amusement park and a fading ocean resort called the Alhambra. The past has driven Jack Sawyer here: his father is gone, his mother is dying, and the world no longer makes sense. But for Jack everything is about to change. For he has been chosen to make a journey back across America--and into another realm.",
    authors: [{ id: uuid(), firstName: "Stephen", lastName: "King" }, { id: uuid(), firstName: "Peter", lastName: "Straub" }]
  }
];

fs.writeFileSync('./data.json', JSON.stringify(data))
console.log(JSON.parse(fs.readFileSync('./data.json')))
