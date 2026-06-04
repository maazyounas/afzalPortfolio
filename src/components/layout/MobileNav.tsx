"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Phone,
  Briefcase,
  Users,
  ChevronRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";

import { navigation } from "@/lib/data/navigation";

type MobileNavProps = {
  activeSection?: string;
  onNavigate?: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
  siteName?: string;
};

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  home: Home,
  about: Info,
  services: Briefcase,
  contact: Phone,
  team: Users,
  default: ChevronRight,
};

export function MobileNav({
  activeSection = "",
  onNavigate,
  siteName = "Softech Financials",
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for button styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  const handleClose = () => setOpen(false);

  const getIcon = (label: string) => {
    const key = label.toLowerCase();
    const IconComponent = iconMap[key] || iconMap.default;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <>
      {/* Menu Button */}
      <motion.button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 active:scale-95 lg:hidden ${
          scrolled || open
            ? "bg-white/95 border border-(--color-line) shadow-md backdrop-blur-md"
            : "bg-white/80 border border-(--color-line) shadow-sm backdrop-blur-lg"
        }`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-(--color-accent-light) to-(--color-accent) opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={open ? "close" : "menu"}
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative z-10"
          >
            {open ? (
              <X className="h-5 w-5 text-(--color-ink)" />
            ) : (
              <Menu className="h-5 w-5 text-(--color-ink)" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 35,
                mass: 0.8,
              }}
              className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl sm:max-w-md lg:hidden"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50 px-6 py-6">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="bg-gradient-to-r from-(--color-ink) to-(--color-accent) bg-clip-text text-2xl font-bold text-transparent">
                      {siteName}
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-(--color-accent)" />
                      <p className="text-xs uppercase tracking-wider text-(--color-muted)">
                        Financial Excellence
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  onClick={handleClose}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-(--color-ink) transition-all duration-300 hover:bg-red-50 hover:text-red-500"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-8">
                <div className="space-y-2">
                  {navigation.map((item, index) => {
                    const id = item.href.split("#")[1] ?? "";
                    const isActive = activeSection === id;

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();

                            const element = document.getElementById(id);

                            if (element) {
                              handleClose();

                              setTimeout(() => {
                                element.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }, 300);
                            }
                          }}
                          className={`group relative flex items-center justify-between rounded-xl px-5 py-4 text-sm font-semibold transition-all duration-300 sm:text-base ${
                            isActive
                              ? "bg-(--color-accent) text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-50 hover:pl-6"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ rotate: 5 }}
                              className={`transition-colors duration-300 ${
                                isActive ? "text-white" : "text-gray-400"
                              }`}
                            >
                              {getIcon(item.label)}
                            </motion.div>
                            <span>{item.label}</span>
                          </div>

                          {isActive ? (
                            <Sparkles className="h-4 w-4 text-white/80" />
                          ) : (
                            <ChevronRight
                              className={`h-4 w-4 transition-all duration-300 group-hover:translate-x-1 ${
                                isActive
                                  ? "text-white"
                                  : "text-gray-400 group-hover:text-(--color-accent)"
                              }`}
                            />
                          )}

                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="activeNav"
                              className="absolute inset-0 rounded-xl bg-(--color-accent) -z-10"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50 p-6"
              >
                <div className="space-y-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Zap className="h-4 w-4 text-(--color-accent)" />
                    <Shield className="h-4 w-4 text-(--color-accent)" />
                    <Sparkles className="h-4 w-4 text-(--color-accent)" />
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500">
                    Empowering businesses with innovative financial solutions
                    and expert guidance.
                  </p>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
