interface LogoLinkProps {
  url: string;
  label: string;
  children: React.ReactNode;
}

const LogoLink: React.FC<LogoLinkProps> = ({ url, label, children }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-70 transition-opacity"
      aria-label={label}
    >
      {children}
    </a>
  );
};

export default LogoLink;
