import { Fragment } from "react";

const WORDS = ["PRICING", "PHOTOS", "ANNONCE", "NÉGOCIATION", "CLOSING"];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {items.map((word, i) => (
          <Fragment key={i}>
            <span className="hi">{word}</span>
            <span>·</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
