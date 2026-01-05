function IconURL({
  href,
  icon,
  size = 32,
}: {
  href: string;
  icon: string;
  size?: number;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img
        src={`./assets/icons/${icon}.svg`}
        width={size}
        height={size}
        alt={icon}
      />
    </a>
  );
}

export default IconURL;
