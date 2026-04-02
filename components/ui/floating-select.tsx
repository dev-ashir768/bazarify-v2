"use client";

import { useState } from "react";
import ReactSelect, { Props as SelectProps, StylesConfig } from "react-select";
import { Label } from "./label";

export interface FloatingSelectProps extends SelectProps {
  label: string;
}

export const FloatingSelect = ({ label, ...props }: FloatingSelectProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue =
    !!props.value &&
    (Array.isArray(props.value)
      ? props.value.length > 0
      : typeof props.value === "string"
        ? props.value.length > 0
        : typeof props.value === "object" &&
          Object.keys(props.value).length > 0);

  const isFloated = isFocused || hasValue;

  const defaultStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "56px",
      borderWidth: state.isFocused ? "1px" : "2px",
      borderRadius: "0.75rem",
      borderColor: state.isFocused ? "var(--primary)" : "var(--border)",
      boxShadow: state.isFocused
        ? "0 0 0 1px var(--primary), 0 0 0 4px color-mix(in oklch, var(--primary) 20%, transparent)"
        : "none",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      "&:hover": {
        borderColor: state.isDisabled
          ? "var(--border)"
          : state.isFocused
            ? "var(--primary)"
            : "var(--border)",
      },
      backgroundColor: state.isDisabled ? "var(--muted)" : "transparent",
      opacity: state.isDisabled ? 0.6 : 1,
      cursor: state.isDisabled ? "not-allowed" : "default",
      fontSize: "14px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 16px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "var(--muted-foreground)",
      padding: "8px 16px 8px 8px",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "var(--muted-foreground)",
      fontSize: "14px",
      textTransform: "capitalize",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      whiteSpace: "normal",
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: "var(--muted-foreground)",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      display: state.isDisabled ? "none" : "flex",
      ":hover": {
        backgroundColor: "var(--primary)",
        color: "var(--background)",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "var(--muted-foreground)",
      cursor: "pointer",
      padding: "0px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
      marginTop: "4px",
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled
        ? "transparent"
        : state.isSelected
          ? "var(--primary)"
          : state.isFocused
            ? "var(--muted)"
            : "transparent",
      
      color: state.isSelected 
        ? "var(--background)" 
        : "var(--muted-foreground)",
      
      opacity: state.isDisabled ? 0.5 : 1, 
      
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      
      "&:active": state.isDisabled
        ? {} 
        : {
            backgroundColor: "var(--primary)",
            color: "var(--background)",
          },
    }),
    // option: (provided, state) => ({
    //   ...provided,
    //   backgroundColor: state.isSelected
    //     ? "var(--primary)"
    //     : state.isFocused
    //       ? "var(--muted)"
    //       : "transparent",
    //   color: state.isSelected ? "var(--background)" : "var(--muted-foreground)",
    //   cursor: "pointer",
    //   "&:active": {
    //     backgroundColor: "var(--primary)",
    //     color: "var(--background)",
    //   },
    // }),
    placeholder: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  const combinedStyles = {
    ...defaultStyles,
    ...(props.styles || {}),
  };

  return (
    <div className="relative">
      <ReactSelect
        {...props}
        styles={combinedStyles}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        onChange={(val, actionMeta) => {
          props.onChange?.(val, actionMeta);
        }}
        placeholder=""
      />
      <Label
        className={`absolute left-3 bg-background px-2 font-medium z-10 pointer-events-none transition-all duration-200 ${
          isFloated ? "-top-[10px] text-sm" : "top-[16px] text-[14px]"
        } ${
          props.isDisabled
            ? "text-muted-foreground opacity-50 bg-transparent"
            : isFocused
              ? "text-primary"
              : "text-muted-foreground"
        }`}
      >
        {label}
      </Label>
    </div>
  );
};
