"use client";

import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  motion as framerMotion,
  useInView,
  type MotionProps,
  type Variants,
} from "framer-motion";

import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  JSX,
  PropsWithoutRef,
  RefAttributes,
  ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type MotionTag<
  Tag extends keyof JSX.IntrinsicElements,
  Element,
> = ForwardRefExoticComponent<
  PropsWithoutRef<JSX.IntrinsicElements[Tag] & MotionProps> &
    RefAttributes<Element>
>;

type TypedMotion = typeof framerMotion & {
  aside: MotionTag<"aside", HTMLElement>;
  blockquote: MotionTag<"blockquote", HTMLQuoteElement>;
  div: MotionTag<"div", HTMLDivElement>;
  form: MotionTag<"form", HTMLFormElement>;
  section: MotionTag<"section", HTMLElement>;
  span: MotionTag<"span", HTMLSpanElement>;
  header: MotionTag<"header", HTMLElement>;
  footer: MotionTag<"footer", HTMLElement>;
  nav: MotionTag<"nav", HTMLElement>;
  main: MotionTag<"main", HTMLElement>;
  article: MotionTag<"article", HTMLElement>;
  ul: MotionTag<"ul", HTMLUListElement>;
  li: MotionTag<"li", HTMLLIElement>;
  button: MotionTag<"button", HTMLButtonElement>;
  p: MotionTag<"p", HTMLParagraphElement>;
  h1: MotionTag<"h1", HTMLHeadingElement>;
  h2: MotionTag<"h2", HTMLHeadingElement>;
  h3: MotionTag<"h3", HTMLHeadingElement>;
  h4: MotionTag<"h4", HTMLHeadingElement>;
  h5: MotionTag<"h5", HTMLHeadingElement>;
  h6: MotionTag<"h6", HTMLHeadingElement>;
};

export const motion = framerMotion as TypedMotion;

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useInView,
};

export type HTMLMotionProps<
  Tag extends keyof JSX.IntrinsicElements,
> = ComponentPropsWithoutRef<Tag> & MotionProps;

/* -------------------------------------------------------------------------- */
/*                              Shared Variants                               */
/* -------------------------------------------------------------------------- */

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainer = (
  stagger = 0.08,
  delay = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                            Motion Wrapper Provider                         */
/* -------------------------------------------------------------------------- */

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({
  children,
}: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}