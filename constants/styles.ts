import {StyleSheet} from 'react-native';
import {KnowledgeLevelColor} from '../types/KnowledgeLevel';

export const baseUnit = 10;
export const BORDER_SIZE = 30;

export const flex = StyleSheet.create({
  f1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpace: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
});

export const border = StyleSheet.create({
  radios0: {
    borderRadius: 0,
  },
});

export const position = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  top0: {
    top: 0,
  },
  left0: {
    left: 0,
  },
  right0: {
    right: 0,
  },
  bottom0: {
    bottom: 0,
  },
  z0: {
    zIndex: 0,
  },
  z1: {
    zIndex: 1,
  },
  z2: {
    zIndex: 2,
  },
  z3: {
    zIndex: 3,
  },
  z4: {
    zIndex: 4,
  },
  z5: {
    zIndex: 5,
  },
});

export const container = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
  space: {
    justifyContent: 'space-between',
  },
  center: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  flexXSpace: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  flexX: {
    display: 'flex',
    flexDirection: 'row',
  },
  fullScreen: {
    height: '100%',
    width: '100%',
  },
  hFull: {
    height: '100%',
  },
  wFull: {
    width: '100%',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  buttonTop: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  buttonBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: baseUnit * 2,
  },
  buttonTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: baseUnit * 2,
  },
});

export const KLMark = StyleSheet.create({
  Learning: {
    borderBottomColor: KnowledgeLevelColor.Learning,
    borderBottomWidth: BORDER_SIZE,
  },
  GettingThere: {
    borderBottomColor: KnowledgeLevelColor.GettingThere,
    borderBottomWidth: BORDER_SIZE,
  },
  Confident: {
    borderBottomColor: KnowledgeLevelColor.Confident,
    borderBottomWidth: BORDER_SIZE,
  },
});

export const color = StyleSheet.create({
  bgTransparent: {backgroundColor: 'transparent'},
  bgPurple: {backgroundColor: 'purple'},
  bgGreen: {backgroundColor: 'green'},
  bgPink: {backgroundColor: 'pink'},
  bgBlue: {backgroundColor: 'blue'},
  bgRed: {backgroundColor: 'red'},
  opacity1: {opacity: 0.1},
  opacity3: {opacity: 0.3},
  opacity5: {opacity: 0.5},
  opacity6: {opacity: 0.6},
  opacity7: {opacity: 0.7},
  opacity8: {opacity: 0.8},
  opacity9: {opacity: 0.9},
});

export const text = StyleSheet.create({
  dialogTitle: {
    fontSize: 18,
  },
  grayMessage: {opacity: 0.3, width: '100%', textAlign: 'center'},
});

export const gap = StyleSheet.create({
  base: {
    gap: baseUnit / 5,
  },
  base1: {
    gap: baseUnit / 4,
  },
  base2: {
    gap: baseUnit / 3,
  },
  base3: {
    gap: baseUnit / 2,
  },
  base4: {
    gap: baseUnit,
  },
  base5: {
    gap: baseUnit * 2,
  },
  base6: {
    gap: baseUnit * 3,
  },
});

export const margin = StyleSheet.create({
  none: {
    margin: 0,
  },
  base: {
    margin: baseUnit,
  },
  base2: {
    margin: baseUnit * 2,
  },
  base3: {
    margin: baseUnit * 3,
  },
  base4: {
    margin: baseUnit * 4,
  },
  base5: {
    margin: baseUnit * 5,
  },
  base6: {
    margin: baseUnit * 6,
  },
  base7: {
    margin: baseUnit * 7,
  },
  base8: {
    margin: baseUnit * 8,
  },
  top: {
    marginTop: baseUnit,
  },
  top2: {
    marginTop: baseUnit * 2,
  },
  top3: {
    marginTop: baseUnit * 3,
  },
  top4: {
    marginTop: baseUnit * 4,
  },
  top5: {
    marginTop: baseUnit * 5,
  },
  top6: {
    marginTop: baseUnit * 6,
  },
  top7: {
    marginTop: baseUnit * 7,
  },
  top8: {
    marginTop: baseUnit * 8,
  },
  left: {
    marginLeft: baseUnit,
  },
  left2: {
    marginLeft: baseUnit * 2,
  },
  left3: {
    marginLeft: baseUnit * 3,
  },
  left4: {
    marginLeft: baseUnit * 4,
  },
  left5: {
    marginLeft: baseUnit * 5,
  },
  left6: {
    marginLeft: baseUnit * 6,
  },
  left7: {
    marginLeft: baseUnit * 7,
  },
  left8: {
    marginLeft: baseUnit * 8,
  },
  right: {
    marginRight: baseUnit,
  },
  right2: {
    marginRight: baseUnit * 2,
  },
  right3: {
    marginRight: baseUnit * 3,
  },
  right4: {
    marginRight: baseUnit * 4,
  },
  right5: {
    marginRight: baseUnit * 5,
  },
  right6: {
    marginRight: baseUnit * 6,
  },
  right7: {
    marginRight: baseUnit * 7,
  },
  right8: {
    marginRight: baseUnit * 8,
  },
  bottom: {
    marginBottom: baseUnit,
  },
  bottom2: {
    marginBottom: baseUnit * 2,
  },
  bottom3: {
    marginBottom: baseUnit * 3,
  },
  bottom4: {
    marginBottom: baseUnit * 4,
  },
  bottom5: {
    marginBottom: baseUnit * 5,
  },
  bottom6: {
    marginBottom: baseUnit * 6,
  },
  bottom7: {
    marginBottom: baseUnit * 7,
  },
  bottom8: {
    marginBottom: baseUnit * 8,
  },
  x: {
    marginLeft: baseUnit,
    marginRight: baseUnit,
  },
  x2: {
    marginLeft: baseUnit * 2,
    marginRight: baseUnit * 2,
  },
  x3: {
    marginLeft: baseUnit * 3,
    marginRight: baseUnit * 3,
  },
  x4: {
    marginLeft: baseUnit * 4,
    marginRight: baseUnit * 4,
  },
  y: {
    marginTop: baseUnit,
    marginBottom: baseUnit,
  },
  y2: {
    marginTop: baseUnit * 2,
    marginBottom: baseUnit * 2,
  },
  y3: {
    marginTop: baseUnit * 3,
    marginBottom: baseUnit * 3,
  },
  y4: {
    marginTop: baseUnit * 4,
    marginBottom: baseUnit * 4,
  },
});

export const padding = StyleSheet.create({
  none: {
    padding: 0,
  },
  base: {
    padding: baseUnit,
  },
  base2: {
    padding: baseUnit * 2,
  },
  base3: {
    padding: baseUnit * 3,
  },
  base4: {
    padding: baseUnit * 4,
  },
  base5: {
    padding: baseUnit * 5,
  },
  base6: {
    padding: baseUnit * 6,
  },
  base7: {
    padding: baseUnit * 7,
  },
  base8: {
    padding: baseUnit * 8,
  },
  left: {
    paddingLeft: baseUnit,
  },
  top: {
    paddingTop: baseUnit,
  },
  top2: {
    paddingTop: baseUnit * 2,
  },
  top3: {
    paddingTop: baseUnit * 3,
  },
  top4: {
    paddingTop: baseUnit * 4,
  },
  top5: {
    paddingTop: baseUnit * 5,
  },
  top6: {
    paddingTop: baseUnit * 6,
  },
  top7: {
    paddingTop: baseUnit * 7,
  },
  top8: {
    paddingTop: baseUnit * 8,
  },
  bottom: {
    paddingBottom: baseUnit,
  },
  bottom2: {
    paddingBottom: baseUnit * 2,
  },
  bottom3: {
    paddingBottom: baseUnit * 3,
  },
  bottom4: {
    paddingBottom: baseUnit * 4,
  },
  bottom5: {
    paddingBottom: baseUnit * 5,
  },
  bottom6: {
    paddingBottom: baseUnit * 6,
  },
  bottom7: {
    paddingBottom: baseUnit * 7,
  },
  bottom8: {
    paddingBottom: baseUnit * 8,
  },
  x: {
    paddingLeft: baseUnit,
    paddingRight: baseUnit,
  },
});
