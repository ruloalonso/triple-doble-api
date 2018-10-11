function parseStats(set) {
  let stats = {
    gp: set[6],
    min: set[8],
    oreb: set[18],
    dreb: set[19],
    ast: set[21],
    stl: set[22],
    blk: set[23],
    tov: set[24],
    pf: set[25],
    pts: set[26]
  }
  stats.fpts = calculateFP(stats);
  stats.fptsMin = Math.round(stats.fpts / stats.min * 1000) / 1000;
  return stats;
}

function calculateFP(stats) {
  let plus = stats.oreb + stats.dreb + stats.ast + stats.stl + stats.blk + stats.pts;
  let minus = stats.tov + stats.pf;
  return Math.round((plus - minus) * 100) / 100;
}