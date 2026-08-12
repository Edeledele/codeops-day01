// ==============================================
// Loyalty Points Module (TeleBirr shop)
// ==============================================

function defaultEarnRule(etb) {
  return Math.floor(etb / 10);
}


function holidayEarnRule(etb) {
  return Math.floor(etb / 10) * 2;
}

/**
 * Factory that creates a loyalty card with a private points balance.
 * @param {(etb: number) => number} earnRule - pure function that turns an
 *   ETB amount into points earned. Defaults to 1 point per 10 ETB.
 * @returns {{earn: Function, redeem: Function, balance: Function}}
 */
function createLoyalty(earnRule = defaultEarnRule) {
  let points = 0; // private state, captured by closure

  return {
    // earn() is a higher-order consumer: it delegates the *math* of how
    // many points to award to whatever earnRule function was passed in.
    earn(etb) {
      points += earnRule(etb);
    },
    // redeem() never lets the balance go negative.
    redeem(p) {
      points = Math.max(0, points - p);
    },
    // balance() is the only way to read the private `points` variable.
    balance() {
      return points;
    },
  };
}

module.exports = { createLoyalty, defaultEarnRule, holidayEarnRule };