import styles from "./Style.module.css";
import { TextField, InputAdornment } from "@mui/material";

type Props = {
    type: "native" | "token";
    tokenSymbol?: string;
    tokenBalance?: string;
    current: string;
    setValue: (value: string) => void;
    max?: string;
    value: string;
    cryptoSign?: string; // New prop
};

export default function SwapInput({
    type,
    tokenSymbol,
    tokenBalance,
    setValue,
    value,
    current,
    max,
    cryptoSign, // New prop
}: Props) {
    const truncate = (value: string) => {
        if (value === undefined) return;
        if (value.length > 5) {
            return value.slice(0, 5);
        }
        return value;
    };

    return (
        <div className={styles.swapInputContainer}>
           <TextField 
                type="number"
                placeholder="0.0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={current !== type} 
                className={styles.swapInput}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{cryptoSign}</InputAdornment>,
                }}
            /> 
            <div style={{
            }}>
                <p style={{
                    fontSize: "12px",
                }}>{tokenSymbol}</p>
                <p style={{
                    fontSize: "10px",
                }}>Balance: {truncate(tokenBalance as string)}</p>
                {current === type && (
                    <button
                        onClick={() => setValue(max || "0")}
                        className={styles.maxButton}
                    >Max</button>
                )}
            </div>
        </div>
    )
}