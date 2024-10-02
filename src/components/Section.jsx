import "./Section.css";

const Section = () => {

  return (
    <section className="tier">
      <div className="row">
        <aside className="label" style={{ "--level": "var(--color-s)" }}>
          <span contentEditable="true" suppressContentEditableWarning={true}>
            S
          </span>
        </aside>
      </div>

      <div className="row">
        <aside className="label" style={{ "--level": "var(--color-a)" }}>
          <span contentEditable="true" suppressContentEditableWarning={true}>
            A
          </span>
        </aside>
      </div>

      <div className="row">
        <aside className="label" style={{ "--level": "var(--color-b)" }}>
          <span contentEditable="true" suppressContentEditableWarning={true}>
            B
          </span>
        </aside>
      </div>

      <div className="row">
        <aside className="label" style={{ "--level": "var(--color-c)" }}>
          <span contentEditable="true" suppressContentEditableWarning={true}>
            C
          </span>
        </aside>
      </div>

      <div className="row">
        <aside className="label" style={{ "--level": "var(--color-d)" }}>
          <span contentEditable="true" suppressContentEditableWarning={true}>
            D
          </span>
        </aside>
      </div>

      <div className="row">
        <aside className="label" style={{ "--level": "var(--color-e)" }}>
          <span contentEditable="true" suppressContentEditableWarning={true}>
            E
          </span>
        </aside>
      </div>
    </section>
  );
};

export default Section;
