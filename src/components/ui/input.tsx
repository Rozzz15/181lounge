'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, value, placeholder, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && String(value).length > 0;
    const showFloatingLabel = isFocused || hasValue;

    return (
      <div className="w-full">
        <div className="relative">
          {label && (
            <motion.label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 pointer-events-none z-10 bg-white px-1",
                showFloatingLabel
                  ? "-top-2 text-xs text-[#525A40]"
                  : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
              )}
              initial={false}
              animate={{
                y: showFloatingLabel ? 0 : "-50%",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1.2 }}
            >
              {label}
            </motion.label>
          )}
          <input
            type={type}
            id={inputId}
            value={value}
            placeholder={showFloatingLabel ? placeholder : " "}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base transition-all duration-300',
              'placeholder:text-transparent',
              'focus:border-[#525A40] focus:outline-none focus:ring-2 focus:ring-[#525A40]/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, value, placeholder, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && String(value).length > 0;
    const showFloatingLabel = isFocused || hasValue;

    return (
      <div className="w-full">
        <div className="relative">
          {label && (
            <motion.label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 pointer-events-none z-10 bg-white px-1",
                showFloatingLabel
                  ? "-top-2 text-xs text-[#525A40]"
                  : "top-4 text-sm text-gray-400"
              )}
              initial={false}
              animate={{
                y: 0,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1.2 }}
            >
              {label}
            </motion.label>
          )}
          <textarea
            id={inputId}
            value={value}
            placeholder={showFloatingLabel ? placeholder : " "}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              'flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base transition-all duration-300',
              'placeholder:text-transparent',
              'focus:border-[#525A40] focus:outline-none focus:ring-2 focus:ring-[#525A40]/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, value, options, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && String(value).length > 0;
    const showFloatingLabel = isFocused || hasValue;

    return (
      <div className="w-full">
        <div className="relative">
          {label && showFloatingLabel && (
            <motion.label
              htmlFor={inputId}
              className="absolute left-4 -top-2 text-xs text-[#525A40] bg-white px-1 pointer-events-none z-10"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1.2 }}
            >
              {label}
            </motion.label>
          )}
          <select
            id={inputId}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base transition-all duration-300 appearance-none',
              'focus:border-[#525A40] focus:outline-none focus:ring-2 focus:ring-[#525A40]/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              !hasValue && 'text-gray-400',
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Input, Textarea, Select };
