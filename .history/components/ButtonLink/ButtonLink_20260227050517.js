import Link from "next/link";

export const ButtonLink = ({ destination, label, fullWidth }) => {
  if (!destination) {
    return null;
  }
  return (
    <Link
      href={destination}
      className={`btn${fullWidth ? " w-full text-center" : ""}`}
    >
      {label}
    </Link>
  );
};
