import React from "react";

export default function TeamCard({
  id,
  name,
  role,
  emoji,
  imageSrc,
  image,
  gradient = "linear-gradient(135deg, var(--primary), var(--primary-light))",
  linkedinUrl = "#",
  twitterUrl = "#",
  delay,
}) {
  const delayClass = delay ? ` delay-${delay}` : "";
  const cardClassName = `team-card animate-on-scroll${delayClass}`;
  const finalImage = imageSrc || image;

  return (
    <div className={cardClassName} id={id}>
      <div className="team-img-wrapper">
        {finalImage ? (
          <img
            src={finalImage}
            alt={name}
          />
        ) : (
          <div
            style={{
              background: gradient,
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "4rem",
            }}
          >
            {emoji || "👤"}
          </div>
        )}
        <div className="team-socials">
          <a href={linkedinUrl} className="team-social-icon" target="_blank" rel="noopener noreferrer">
            IN
          </a>
          <a href={twitterUrl} className="team-social-icon" target="_blank" rel="noopener noreferrer">
            TW
          </a>
        </div>
      </div>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
