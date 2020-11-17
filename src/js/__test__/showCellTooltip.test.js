test('showCellToolTip', () => {
  const character = {
    level: 1,
    attack: 2,
    defence: 3,
    health: 4,
    attackRange: 5,
    travelRange: 6,
  };

  const expected = '🎖 1 ⚔ 2 🛡 3 ❤ 4 ➹ 5 👣 6';

  const received = `\u{1F396} ${character.level
  } \u{2694} ${character.attack
  } \u{1F6E1} ${character.defence
  } \u{2764} ${character.health
  } \u{27B9} ${character.attackRange
  } \u{1F463} ${character.travelRange}`;

  expect(received).toBe(expected);
});
