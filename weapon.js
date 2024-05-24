class weapon {
  constructor({ attackPower = 0, range = 100, durability = 100 } = {}) {
    this.attackPower = attackPower;
    this.range = range;
    this.durability = durability;
  }
}
