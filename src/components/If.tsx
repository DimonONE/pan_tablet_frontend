import { FC, ReactNode } from "react";

interface IProps {
    condition: boolean,
    children: ReactNode,
    anotherChildren?: ReactNode | null,
}

export const If: FC<IProps> = ({ children, condition, anotherChildren = null }) => (
    <>{condition ? children : anotherChildren}</>
);
