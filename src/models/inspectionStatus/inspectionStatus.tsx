import {t} from 'i18next';

export enum IInspectionStatus {
  NEEDS = 1,
  SCHEDULED = 2,
  COMPLETED = 3,
}

export const ISituationTranslationText: {
  [key in IInspectionStatus]: string;
} = {
  [IInspectionStatus.NEEDS]: t('점검필요'),
  [IInspectionStatus.SCHEDULED]: t('점검예정'),
  [IInspectionStatus.COMPLETED]: t('점검완료'),
};

export const ISituationTranslationColor: {
  [key in IInspectionStatus]: string;
} = {
  [IInspectionStatus.NEEDS]: '#FDA29B',
  [IInspectionStatus.SCHEDULED]: '#FFE680',
  [IInspectionStatus.COMPLETED]: '#6CE9A6',
};
