import {TEST_SIDES, TestSide} from '../types/TestSettings';

export function isTestSide(value: string): boolean {
  return TEST_SIDES.find(side => side === (value as TestSide)) !== undefined;
}

export function toRawStringList(ids: number[]): string[] {
  if (ids && ids.length) {
    return ids.map(id => id.toString());
  }
  console.error('toStringIds', ids);
  return [];
}

export function toStringIds(ids: number[]): string[] {
  if (ids && ids.length) {
    return ids.map(id => id.toString());
  }
  console.error('toStringIds', ids);
  return [];
}

export function rawStringArrayToIntArray(raw: string): number[] {
  if (!raw) {
    console.error('rawStringArrayToIntArray: empty array', raw);
  }
  const stringArray = raw ? raw.split(',') : [];

  return toIntIds(stringArray);
}

export function toIntIds(ids: string[]): number[] {
  return ids.map(id => parseInt(id));
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}
