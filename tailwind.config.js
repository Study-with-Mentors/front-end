

/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const SCREENS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
};

function screenToPx(screen) {
  return `${screen}px`;
}

function screenUp(screen) {
  return { min: screenToPx(screen) };
}

function screenDown(screen) {
  return { max: screenToPx(screen - 1) };
}

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    extend: {

      borderColor: {
        primary: "rgb(239,239,239)"
      },
      textColor:{
        primary: "rgb(142,142,142)",
        blue: "rgba(12,154,246,255)",
        blue_400: "rgba(12,154,246,0.8)",
        gray_400: "rgba(19,70,118,255)",
        red: "rgb(255, 48, 64)",
        primary_text: "rgb(250, 250, 250)"
      },

      colors: {
        'bms-primary': '#7254E9',
        'bms-primary-600':'#4E41BB',
        'bms-hover-primary': '#9783EE',
        'bms-press-primary': '#4E41BB',
        'bms-text-primary':'#262626',
        'bms-primary-50':'#FBFAFE',
        //Gray 500
        'bms-text-secondary':'#8C8C8C',
        'bms-gray-500':'#8C8C8C',
        'bms-gray-100':'#F5F5F5',
        'bms-gray-300':'#D9D9D9',
        'bms-gray-800':'#262626',
        'bms-gray-200':'#F0F0F0',

        //Gray 600
        'bms-gray-600':'#595959',
        //Secondary
        'bms-secondary-200':'#EBFEF1',
        'bms-secondary-700':'#4E926B',
        'bms-secondary-400':'#A2EBBC',
        //Warning
        'bms-warning':'#FFA23A',
        'bms-warning200':'rgba(255, 162, 58, 0.2)',
        'bms-warning500':'rgba(255, 162, 58, 0.5)',
        //Error
        'bms-error':'#EE5564',



      },
      fontFamily:{
        'montserrat':'Montserrat, sans-serif',
        'lexend':'Lexend,sans-serif'
      },
      outline: {
        primary: ['1px solid #9783EE'],
      },
      backgroundOpacity: { 6: '0.06' },
      
      borderWidth: {
        3: '3px',
        6: '6px',
        7: '7px',
        11: '11px',
      },
      fontSize: {
        xxs: '10px',
      },
      fontWeight:{
        thinest:100,
        thin:200,
        seminormal:300,
        normal:400,
        medium:500,
        semibold:600,
        bold:700,
        bolder:800,
        extrabold:900,
      },
      
      backgroundColor: {
        'primary': '#FFFFFF',
        'gray_primary': "#EEEEEE",
        'white_secondary': "#F5F5F5",
      },
      minWidth: {
        6: '1.5rem',
        9: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        21: '5.5rem',
        22: '5.75rem',
        24: '6rem',
        26: '6.5rem',
        28: '7rem',
        30: '7.5rem',
        32: '8rem',
        33: '8.25rem',
        34: '8.5rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        60: '15rem',
        65: '16.5rem',
        86: '21.5rem',
      },
      width: {
        18: '4.5rem',
        21: '5.5rem',
        22: '5.75rem',
        26: '6.5rem',
        30: '7.5rem',
        33: '8.25rem',
        34: '8.5rem',
        49: '12.1rem',
        50: '12.5rem',
        65: '16.5rem',
        86: '21.5rem',
        fit: 'fit-content',
      },
      inset: {
        '3/20': '15%',
        '1/10': '10%',
        '1/20': '5%',
        26: '6.5rem',
        34: '8.5rem',
      },
      margin: {
        13: '3.25rem',
        42: '10.5rem',
        45: '11.25rem',
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-20%)', 'pointer-events': 'none' },
          '100%': { opacity: 1, transform: 'translateY(0)', 'pointer-events': 'auto' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s',
      },
      boxShadow: {
        'bms-1': '0px 4px 10px rgba(0, 0, 0, 0.1)',
        'bms-2': '0px 4px 8px 0px #00000033',
        'bms-3': '0px 2px 4px rgba(189, 15, 114, 0.6)',
        'bms-4': '0px 6px 20px rgba(0, 0, 0, 0.12)',
        'bms-big': '0px 16px 48px rgba(0, 0, 0, 0.22)',
        'drop-big': '0px 8px 30px rgba(0, 0, 0, 0.15)',
        'aoq-my-contract-left': '-4px 0 4px rgba(0, 0, 0, 0.12)',
        'aoq-my-contract-right': '4px 0 4px rgba(0, 0, 0, 0.12)',
        'box-sm': '0 4px 8px rgba(0, 0, 0, 0.12)',
        'box-lg': '0px 16px 50px rgba(51, 51, 51, 0.2)',
        'scroll-right': '6px 8px 16px rgba(51, 51, 51, 0.12)',
      },
      maxWidth: {
        'screen-xs': screenToPx(SCREENS.xs),
        'screen-sm': screenToPx(SCREENS.sm),
        'screen-md': screenToPx(SCREENS.md),
        'screen-lg': screenToPx(SCREENS.lg),
        'screen-xl': screenToPx(SCREENS.xl),
        'screen-2xl': screenToPx(SCREENS['2xl']),
        'screen-3xl': screenToPx(SCREENS['3xl']),
        6: '1.5rem',
        9: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        21: '5.5rem',
        22: '5.75rem',
        24: '6rem',
        26: '6.5rem',
        28: '7rem',
        30: '7.5rem',
        32: '8rem',
        33: '8.25rem',
        34: '8.5rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        60: '15rem',
        65: '16.5rem',
        86: '21.5rem',
      },
      letterSpacing: {
        tightest: '-.075em',
      },
    },
    screens: {
      xs: screenUp(SCREENS.xs),
      xsDown: screenDown(SCREENS.sm),

      sm: screenUp(SCREENS.sm),
      smDown: screenDown(SCREENS.md),

      md: screenUp(SCREENS.md),
      mdDown: screenDown(SCREENS.lg),

      lg: screenUp(SCREENS.lg),
      lgDown: screenDown(SCREENS.xl),

      xl: screenUp(SCREENS.xl),
      xlDown: screenDown(SCREENS['2xl']),

      '2xl': screenUp(SCREENS['2xl']),
      '2xlDown': screenDown(SCREENS['3xl']),

      '3xl': screenUp(SCREENS['3xl']),
    },
   
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.table-sticky-right-col': {
          '@apply sticky right-0 z-1': {},
        },
        '.table-sticky-left-col': {
          '@apply sticky left-0 z-1': {},
        },
        '.bg-primary-hover': {
          '@apply bg-primary bg-opacity-6': {},
        },
        '.scrollbar': {
          scrollbarColor: '#ccd3d1',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            '@apply w-2 h-2': {},
          },
          '&::-webkit-scrollbar-thumb': {
            '@apply rounded-lg': {},
            backgroundColor: '#ccd3d1',
          },
        },
        '.circle': {
          '@apply bg-primary w-[32px] h-[32px] ml-[9px] rounded-full mt-0': {},
        },
        // New Typo
      
        '.bms-text-h4': {
          '@apply font-montserrat font-normal':{},
          lineHeight: '42px',
          fontSize: '34px',
          letterSpacing: '0.0025em',
        },
        '.bms-text-h6': {
          '@apply font-montserrat font-medium':{},
          letterSpacing: '0.0015em',
          fontSize: '20px',
          lineHeight:'25px',
       
        },
        '.bms-subtitle1':{
          '@apply font-montserrat font-medium':{},
          fontSize:'16px',
          lineHeight:'20px',
        },
        '.bms-subtitle2':{
          '@apply font-montserrat font-medium':{},
          fontSize:'14px',
          lineHeight:'17px',
          letterSpacing:'0.001em',
        },
        '.bms-text-body1':{
          '@apply font-montserrat font-normal':{},
          fontSize:'15px',
          lineHeight:'18px',
          letterSpacing:'0.005em',
        },
        '.bms-text-body2':{
          '@apply font-montserrat font-normal':{},
          fontSize:'13px',
          lineHeight:'16px',
          letterSpacing:'0.0025em',
        },
        '.bms-caption':{
          '@apply font-montserrat font-normal':{},
          fontSize:'12px',
          lineHeight:'15px',
          letterSpacing:'0.004em',
        },
        '.bms-link':{
          '@apply font-montserrat bms-text-body1':{},
          letterSpacing:'0.0025em',
        },

       //Tag
        '.bms-tag-primary':{

        },
        '.bms-text-button':{
          '@apply font-montserrat':{},
          fontWeight:500,
          lineHeight:'19px',
          fontSize:'15px',
          letterSpacing:'0.0125em'
        },


        //Button 
        // EFin
        '.sticky-left': {
          '--tw-shadow': '-4px 1px 10px -3px rgba(0, 0, 0, 0.1)',
          boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
        },
        '.sticky-right': {
          '--tw-shadow': '4px 1px 10px -3px rgba(0, 0, 0, 0.1)',
          boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
        },
      });
    }),
  ],
  corePlugins: {
    preflight: false // <== disable this!
  },
};
