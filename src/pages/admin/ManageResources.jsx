import { useCallback, useContext, useEffect, useState } from "react";
import {
  createResource,
  deleteResource,
  fetchResources,
  updateResource,
} from "../../services/resourceService";
import { ToastContext } from "../../context/ToastContextObject";

function ManageResources() {
  const { showToast } = useContext(ToastContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  const loadResources = useCallback(async () => {
    try {
      setIsLoadingResources(true);
      const data = await fetchResources();
      setResources(data);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to load resources",
        "error",
      );
    } finally {
      setIsLoadingResources(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createResource(form);
      showToast("Resource created successfully", "success");
      setForm({ title: "", content: "", category: "" });
      await loadResources();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Error creating resource",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (resource) => {
    setEditingId(resource._id);
    setEditingForm({
      title: resource.title,
      content: resource.content,
      category: resource.category,
    });
  };

  const handleEditSave = async () => {
    if (!editingId) {
      return;
    }

    try {
      await updateResource(editingId, editingForm);
      showToast("Resource updated successfully", "success");
      setEditingId(null);
      await loadResources();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to update resource",
        "error",
      );
    }
  };

  const handleDelete = async (resourceId) => {
    try {
      await deleteResource(resourceId);
      showToast("Resource deleted", "success");
      await loadResources();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to delete resource",
        "error",
      );
    }
  };

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Create Resource</h1>
        <p className="page-subtitle">
          Add high-quality support content for student well-being.
        </p>
      </header>

      <div className="grid grid-2">
        <article className="card">
          <h3 className="card-title">Create Resource</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">
              Title
              <input
                className="input"
                name="title"
                placeholder="Resource title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-label">
              Category
              <input
                className="input"
                name="category"
                placeholder="e.g. Anxiety, Stress, Mindfulness"
                value={form.category}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-label">
              Content
              <textarea
                className="textarea"
                name="content"
                placeholder="Write helpful resource content"
                value={form.content}
                onChange={handleChange}
                required
              />
            </label>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating resource..." : "Create Resource"}
            </button>
          </form>
        </article>

        <article className="card stack">
          <h3 className="card-title">All Resources</h3>
          {isLoadingResources ? (
            <p className="card-text">Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="card-text">No resources available.</p>
          ) : (
            resources.map((resource) => (
              <div key={resource._id} className="card" style={{ padding: 12 }}>
                {editingId === resource._id ? (
                  <div className="form">
                    <input
                      className="input"
                      value={editingForm.title}
                      onChange={(event) =>
                        setEditingForm({
                          ...editingForm,
                          title: event.target.value,
                        })
                      }
                    />
                    <input
                      className="input"
                      value={editingForm.category}
                      onChange={(event) =>
                        setEditingForm({
                          ...editingForm,
                          category: event.target.value,
                        })
                      }
                    />
                    <textarea
                      className="textarea"
                      value={editingForm.content}
                      onChange={(event) =>
                        setEditingForm({
                          ...editingForm,
                          content: event.target.value,
                        })
                      }
                    />
                    <div className="row">
                      <button
                        className="btn btn-primary"
                        onClick={handleEditSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="row"
                      style={{ justifyContent: "space-between" }}
                    >
                      <strong>{resource.title}</strong>
                      <span className="chip">{resource.category}</span>
                    </div>
                    <p className="card-text" style={{ marginTop: 8 }}>
                      {resource.content}
                    </p>
                    <div className="row" style={{ marginTop: 10 }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => startEdit(resource)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => handleDelete(resource._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </article>
      </div>
    </section>
  );
}

export default ManageResources;
