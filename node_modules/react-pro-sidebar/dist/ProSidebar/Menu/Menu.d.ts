import React from 'react';
export declare type IconShape = 'square' | 'round' | 'circle';
export declare type Props = React.HTMLAttributes<HTMLElement> & {
    className?: string;
    children?: React.ReactNode;
    iconShape?: IconShape;
    popperArrow?: boolean;
    subMenuBullets?: boolean;
    innerSubMenuArrows?: boolean;
};
declare const _default: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & {
    className?: string;
    children?: React.ReactNode;
    iconShape?: IconShape;
    popperArrow?: boolean;
    subMenuBullets?: boolean;
    innerSubMenuArrows?: boolean;
} & React.RefAttributes<unknown>>;
export default _default;
