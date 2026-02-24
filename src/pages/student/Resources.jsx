import { useEffect, useState } from "react";
import { fetchResources } from "../../services/resourceService";
import ResourceList from "../../components/resources/ResourceList";

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await fetchResources();
        setResources(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadResources();
  }, []);

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Mental Health Resources</h1>
        <p className="page-subtitle">
          Reliable guidance and learning material curated by the platform.
        </p>
      </header>

      <ResourceList resources={resources} />
    </section>
  );
}

export default Resources;
