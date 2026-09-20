export default function SectionHead({ num, label, title }: { num: string; label: string; title: string }) {
  return (
    <div className="section-head reveal">
      <span className="section-num" aria-hidden="true">
        {num}
      </span>
      <div>
        <p className="mono label">
          {num} / {label}
        </p>
        <h2 className="section-title">{title}</h2>
      </div>
    </div>
  );
}
