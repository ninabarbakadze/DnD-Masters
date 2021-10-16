/*  eslint-disable */
import { iResourceListItem } from './externalData.interface';
interface iDamage_type extends iResourceListItem {} //put this in external data inter

export interface iSpellItem extends iResourceListItem {
  desc: string[];
  range: string;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type: string;
  damage: { damage_type: iDamage_type; damate_at_slot_level: object };
  school: iResourceListItem;
  classes: iResourceListItem[];
  subclasses: iResourceListItem[];
}
