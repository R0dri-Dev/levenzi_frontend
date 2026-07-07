import {
  ParagraphAlign,
  ParagraphSize,
  ParagraphWeight,
} from '../types/paragraph.types';

export const LV_PARAGRAPH_BASE =
  'text-gray-700 leading-relaxed';

export const LV_PARAGRAPH_SIZES: Record<ParagraphSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const LV_PARAGRAPH_WEIGHTS: Record<ParagraphWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};


export const LV_PARAGRAPH_ALIGN: Record<ParagraphAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};
