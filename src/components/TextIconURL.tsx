function TextIconURL({
  text,
  href,
  icon,
  size = 12,
}: {
  text: string;
  href: string;
  icon: string;
  size?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row gap-1 items-center"
    >
      <p>{text}</p>
      <img
        className="resize-none"
        src={`./assets/icons/${icon}.svg`}
        width={size}
        height={size}
        alt={"Icon"}
      />
    </a>
  );
}

export default TextIconURL;
