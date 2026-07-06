export const LV_INPUT_BASE =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60';

export const LV_INPUT_SIZES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-9 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

export const LV_INPUT_VARIANTS: Record<'primary' | 'outline' | 'ghost' | 'danger', string> = {
  primary: '',
  outline: 'border-gray-300 bg-white',
  ghost: 'border-transparent bg-transparent',
  danger: 'border-red-500 focus:border-red-500 focus:ring-red-300',
};

