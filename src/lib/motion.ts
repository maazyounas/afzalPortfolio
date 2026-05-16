"use client";

import {
  AnimatePresence,
  motion as framerMotion,
  useInView,
  type MotionProps,
} from "framer-motion";
import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  JSX,
  PropsWithoutRef,
  RefAttributes,
} from "react";

type MotionTag<Tag extends keyof JSX.IntrinsicElements, Element> =
  ForwardRefExoticComponent<
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
};

export const motion = framerMotion as TypedMotion;

export { AnimatePresence, useInView };

export type HTMLMotionProps<Tag extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<Tag> & MotionProps;
