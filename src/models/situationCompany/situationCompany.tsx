import {t} from 'i18next';

export enum ISituation {
  EXPECTED = 1,
  REQUEST = 2,
  COMPLETE = 3,
}

export const ISituationTranslationText: {
  [key in ISituation]: string;
} = {
  [ISituation.EXPECTED]: t('예정'),
  [ISituation.COMPLETE]: t('완료'),
  [ISituation.REQUEST]: t('요청'),
};

export const ISituationTranslationColor: {
  [key in ISituation]: string;
} = {
  [ISituation.EXPECTED]: '#FFE680',
  [ISituation.COMPLETE]: '#6CE9A6',
  [ISituation.REQUEST]: '#FDA29B',
};
