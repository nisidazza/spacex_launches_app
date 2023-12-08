import styles from "./loading-dots.module.css";

const LoadingDots = ({ color = "#000" }: { color?: string }) => {
  return (
    <span className={styles.loading}>
      <span title="dot" style={{ backgroundColor: color }} />
      <span title="dot" style={{ backgroundColor: color }} />
      <span title="dot" style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
