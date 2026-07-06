export const LV_COLORS = {
  primary: {
    50: 'bg-blue-50 text-blue-700',
    100: 'bg-blue-100 text-blue-700',
    500: 'bg-blue-500 text-white',
    600: 'bg-blue-600 text-white',
    700: 'bg-blue-700 text-white',
    border: 'border-blue-600',
    ring: 'focus:ring-blue-500',
    text: 'text-blue-600'
  },

  secondary: {
    500: 'bg-teal-500 text-white',
    600: 'bg-teal-600 text-white',
    border: 'border-teal-600',
    ring: 'focus:ring-teal-500',
    text: 'text-teal-600'
  },

  success: {
    500: 'bg-green-600 text-white',
    border: 'border-green-600',
    ring: 'focus:ring-green-500',
    text: 'text-green-600'
  },

  warning: {
    500: 'bg-amber-500 text-white',
    border: 'border-amber-500',
    ring: 'focus:ring-amber-400',
    text: 'text-amber-600'
  },

  danger: {
    500: 'bg-red-600 text-white',
    border: 'border-red-600',
    ring: 'focus:ring-red-500',
    text: 'text-red-600'
  },

  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    500: 'bg-gray-500',
    700: 'bg-gray-700',
    900: 'bg-gray-900',

    text: 'text-gray-700',
    border: 'border-gray-300'
  }
} as const;
