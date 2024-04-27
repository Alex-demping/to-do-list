import { FC, ReactNode } from "react";
import './styles.scss'

type BtnType = {
    className: string;
    children: ReactNode;
    onClick?: () => unknown;
    type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
}
const Btn: FC<BtnType> = ({ children, className, type, onClick, disabled }) => {
    return (
        <button disabled={disabled} onClick={onClick} type={type} className={className}>{children}</button>
    )
}

export default Btn
