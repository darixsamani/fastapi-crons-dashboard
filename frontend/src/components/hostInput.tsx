import {useState} from "react";

interface HostInputProps {
  value?: string;
  onChange?: (value: string) => void;   
}

const HostInput = ({ value = "http://localhost:8080/api", onChange }: HostInputProps) => {
  const [val, setVal] = useState(value);
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "#0d0d1a", border: "1px solid #2a2a3e",
      borderRadius: "6px", overflow: "hidden", height: "36px",
    }}>
      <span style={{
        padding: "0 10px", fontSize: "10px", fontWeight: "700",
        letterSpacing: "0.12em", color: "#4a4a6a", textTransform: "uppercase",
        borderRight: "1px solid #2a2a3e", height: "100%",
        display: "flex", alignItems: "center", minWidth: "48px",
      }}>HOST</span>
      <input
        value={val}
        onChange={e => { setVal(e.target.value); onChange?.(e.target.value); }}
        style={{
          minWidth: "250px",
          background: "transparent", border: "none", outline: "none",
          color: "#c8c8e8", fontSize: "13px", fontFamily: "monospace",
          padding: "0 12px", flex: 1, height: "100%",
        }}
      />
    </div>
  );
};


export default HostInput;