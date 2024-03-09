import type { Variants } from 'framer-motion'

const fadeVariant: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const scaleVariant: Variants = {
  enter: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const scaleDownVariant: Variants = {
  enter: {
    scale: 0,
    y: '100%',
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      scale: {
        duration: 0.5,
      },
      y: {
        duration: 0.5,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    y: '100%',
    transition: {
      scale: {
        duration: 0.5,
      },
      y: {
        duration: 0.5,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
}

const TRANSITION_VARIANTS = {
  fade: fadeVariant,
  scale: scaleVariant,
  scaleDown: scaleDownVariant,
}
