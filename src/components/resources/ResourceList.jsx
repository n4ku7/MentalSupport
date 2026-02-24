import ResourceCard from "./ResourceCard";

function ResourceList({ resources }) {
  if (resources.length === 0) {
    return (
      <article className="card">
        <p className="card-text">No resources available right now.</p>
      </article>
    );
  }

  return (
    <div className="grid grid-2">
      {resources.map((resource) => (
        <ResourceCard key={resource._id} resource={resource} />
      ))}
    </div>
  );
}

export default ResourceList;
