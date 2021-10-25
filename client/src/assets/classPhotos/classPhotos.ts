import barbarian from './barbarian.png';
import bard from './bard.png';
import cleric from './cleric.png';
import druid from './druid.png';
import fighter from './fighter.png';
import monk from './monk.png';
import paladin from './paladin.png';
import ranger from './ranger.png';
import rogue from './rogue.png';
import sorcerer from './sorcerer.png';
import warlock from './warlock.png';
import wizard from './wizard.png';

const photos = {
  barbarian,
  bard,
  cleric,
  druid,
  fighter,
  monk,
  paladin,
  ranger,
  rogue,
  sorcerer,
  warlock,
  wizard,
};

export type classPhotoKeys =
  | 'barbarian'
  | 'bard'
  | 'cleric'
  | 'druid'
  | 'fighter'
  | 'monk'
  | 'paladin'
  | 'ranger'
  | 'rogue'
  | 'sorcerer'
  | 'warlock'
  | 'wizard';

export default photos;
