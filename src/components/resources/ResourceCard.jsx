function ResourceCard({ resource }) {
  return (
    <article className="card stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 className="card-title">{resource.title}</h3>
        <span className="chip">{resource.category}</span>
      </div>
      <p className="card-text">{resource.content}</p>
    </article>
  );
}

export default ResourceCard;
