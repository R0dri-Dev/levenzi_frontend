import { LinkVariant } from '../types/link.types';

export const LV_LINK_BASE =
'transition-all duration-200 hover:underline cursor-pointer';

export const LV_LINK_VARIANTS: Record<LinkVariant,string>={

primary:'text-blue-600 hover:text-blue-700',

secondary:'text-gray-700 hover:text-black',

danger:'text-red-600 hover:text-red-700',

muted:'text-gray-500 hover:text-gray-700'

};
