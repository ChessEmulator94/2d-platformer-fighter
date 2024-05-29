class weapon {
  // Range actually relates to the animation size
  constructor({ attackPower = 0, range = 180, durability = 100 } = {}) {
    this.attackPower = attackPower;
    this.range = range;
    this.durability = durability;
  }
}
