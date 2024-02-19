import React from 'react';
export declare type Props = React.HTMLAttributes<HTMLElement> & {
    collapsed?: boolean;
    rtl?: boolean;
    toggled?: boolean;
    width?: string | number;
    collapsedWidth?: string | number;
    image?: string;
    className?: string;
    children?: React.ReactNode;
    breakPoint?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    onToggle?: (value: boolean) => void;
    style?: React.CSSProperties;
};
export interface SidebarContextProps {
    collapsed: boolean;
    rtl: boolean;
    toggled: boolean;
}
export declare const SidebarContext: React.Context<SidebarContextProps>;
declare const _default: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & {
    collapsed?: boolean;
    rtl?: boolean;
    toggled?: boolean;
    width?: string | number;
    collapsedWidth?: string | number;
    image?: string;
    className?: string;
    children?: React.ReactNode;
    breakPoint?: "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
    onToggle?: (value: boolean) => void;
    style?: React.CSSProperties;
} & React.RefAttributes<unknown>>;
export default _default;
