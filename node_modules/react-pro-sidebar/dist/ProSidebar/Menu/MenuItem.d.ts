import React from 'react';
export declare type Props = React.LiHTMLAttributes<HTMLLIElement> & {
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    active?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    firstchild?: boolean;
    popperarrow?: boolean;
};
declare const _default: React.ForwardRefExoticComponent<React.LiHTMLAttributes<HTMLLIElement> & {
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    active?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    firstchild?: boolean;
    popperarrow?: boolean;
} & React.RefAttributes<unknown>>;
export default _default;
