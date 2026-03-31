type StatusType = "Unreachable" | "Reachable" | "Pending";

interface StatusBadgeProps {
  status?: StatusType;
  onClick?: () => void;
}

const configs: Record<StatusType, { dot: string; bg: string; border: string; text: string }> = {
  Unreachable: { dot: "#e05555", bg: "rgba(224,85,85,0.12)", border: "rgba(224,85,85,0.25)", text: "#e07070" },
  Reachable:   { dot: "#4caf7d", bg: "rgba(76,175,125,0.12)", border: "rgba(76,175,125,0.25)", text: "#5fcc96" },
  Pending:     { dot: "#e0a855", bg: "rgba(224,168,85,0.12)", border: "rgba(224,168,85,0.25)", text: "#e0b870" },
};

const StatusBadge = ({ status = "Unreachable", onClick}: StatusBadgeProps) => {
  const cfg = configs[status];
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "7px",
      padding: "0 12px", height: "36px", background: cfg.bg,
      border: `1px solid ${cfg.border}`, borderRadius: "6px",
    }}
    onClick={onClick}
    >
      <span style={{
        width: "8px", height: "8px", borderRadius: "50%",
        background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}`,
      }} />
      <span style={{ fontSize: "12px", fontWeight: "600", color: cfg.text }}>
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;
export type { StatusType, StatusBadgeProps };