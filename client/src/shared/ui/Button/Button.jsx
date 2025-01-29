export default function Button({
  text,
  color,
  disabled,
  icon,
  onClick,
  type = 'button',
  children,
}) {
  return (
    <div onClick={onClick}>
      <button
        type={type}
        style={{ backgroundColor: `${color}` }}
        disabled={disabled}
      >
        {icon && <img src={icon} width={20} />}
        {text}
        {children}
      </button>
    </div>
  );
}
