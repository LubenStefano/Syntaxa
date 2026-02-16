import { useState } from "react";
import styles from "./CreateLecture.module.css";
import { useCreateLecture } from "../../../../hooks/useAdmin";

export default function CreateLecture() {
  const [fileLinks, setFileLinks] = useState([{ name: "", url: "" }]);
  const [resourceLinks, setResourceLinks] = useState([{ name: "", url: "" }]);
  const [title, setTitle] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [logos, setLogos] = useState([]);
  const { createLecture, isLoading, error } = useCreateLecture();

  const addFileLink = () => {
    setFileLinks([...fileLinks, { name: "", url: "" }]);
  };

  const addResourceLink = () => {
    setResourceLinks([...resourceLinks, { name: "", url: "" }]);
  };

  const handleFileLinkChange = (index, field, value) => {
    const updatedLinks = [...fileLinks];
    updatedLinks[index][field] = value;
    setFileLinks(updatedLinks);
  };

  const handleResourceLinkChange = (index, field, value) => {
    const updatedLinks = [...resourceLinks];
    updatedLinks[index][field] = value;
    setResourceLinks(updatedLinks);
  };

  const deleteFileLink = (index) => {
    const updatedLinks = fileLinks.filter((_, i) => i !== index);
    setFileLinks(updatedLinks);
  };

  const deleteResourceLink = (index) => {
    const updatedLinks = resourceLinks.filter((_, i) => i !== index);
    setResourceLinks(updatedLinks);
  };

  const handleTagChange = (value) => {
    setTags((prev) =>
      prev.includes(value) ? prev.filter((tag) => tag !== value) : [...prev, value]
    );
  };

  const handleLogoChange = (value) => {
    setLogos((prev) =>
      prev.includes(value) ? prev.filter((logo) => logo !== value) : [...prev, value]
    );
  };

  const handlePublish = async () => {
    const lectureData = {
      title,
      thumbUrl,
      videoUrl,
      description,
      fileLinks,
      resourceLinks,
      tags,
      logos,
    };

    await createLecture(lectureData);
  };

  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHead}>
        <h1>Create lecture</h1>
        <p className={styles.muted}>
          Add a lecture entry with video and resources.
        </p>
      </header>

      <form className={styles.editorForm}>
        <label>
          Title
          <input
            type="text"
            placeholder="Lecture title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Thumb URL
          <input
            type="url"
            placeholder="https://www.google.com/imgres?..."
            value={thumbUrl}
            onChange={(e) => setThumbUrl(e.target.value)}
          />
        </label>

        <label>
          Video URL
          <input
            type="url"
            placeholder="https://www.youtube.com/embed/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <fieldset className={styles.checkboxGroup}>
          <legend>Tags</legend>
          <label>
            <input
              type="checkbox"
              value="video"
              onChange={(e) => handleTagChange(e.target.value)}
            />
            Video
          </label>
          <label>
            <input
              type="checkbox"
              value="resources"
              onChange={(e) => handleTagChange(e.target.value)}
            />
            Resources
          </label>
          <label>
            <input
              type="checkbox"
              value="task"
              onChange={(e) => handleTagChange(e.target.value)}
            />
            Task
          </label>
          <label>
            <input
              type="checkbox"
              value="information"
              onChange={(e) => handleTagChange(e.target.value)}
            />
            Information
          </label>
        </fieldset>

        <fieldset className={styles.checkboxGroup}>
          <legend>Logos</legend>
          <label>
            <input
              type="checkbox"
              value="js"
              onChange={(e) => handleLogoChange(e.target.value)}
            />
            JS
          </label>
          <label>
            <input
              type="checkbox"
              value="html"
              onChange={(e) => handleLogoChange(e.target.value)}
            />
            HTML
          </label>
          <label>
            <input
              type="checkbox"
              value="css"
              onChange={(e) => handleLogoChange(e.target.value)}
            />
            CSS
          </label>
        </fieldset>

        {/* Dynamic fields for file links */}
        <fieldset>
          <legend>File Links</legend>
          {fileLinks.map((link, index) => (
            <div key={index} className={styles.dynamicField}>
              <input
                type="text"
                placeholder="File name"
                value={link.name}
                onChange={(e) => handleFileLinkChange(index, "name", e.target.value)}
              />
              <input
                type="url"
                placeholder="File URL"
                value={link.url}
                onChange={(e) => handleFileLinkChange(index, "url", e.target.value)}
              />
              <div
                type="button"
                className={styles.deleteButton}
                onClick={() => deleteFileLink(index)}
              >
                ✖
              </div>
            </div>
          ))}
          <div type="button" onClick={addFileLink} className={styles.addButton}>
            + Add File Link
          </div>
        </fieldset>

        {/* Dynamic fields for resource links */}
        <fieldset>
          <legend>Resource Links</legend>
          {resourceLinks.map((link, index) => (
            <div key={index} className={styles.dynamicField}>
              <input
                type="text"
                placeholder="Resource name"
                value={link.name}
                onChange={(e) => handleResourceLinkChange(index, "name", e.target.value)}
              />
              <input
                type="url"
                placeholder="Resource URL"
                value={link.url}
                onChange={(e) => handleResourceLinkChange(index, "url", e.target.value)}
              />
              <div
                type="button"
                className={styles.deleteButton}
                onClick={() => deleteResourceLink(index)}
              >
                ✖
              </div>
            </div>
          ))}
          <div type="button" onClick={addResourceLink} className={styles.addButton}>
            + Add Resource Link
          </div>
        </fieldset>

        <div className={styles.formActions}>
          <div
            className={`${styles.button} ${styles.primary}`}
            type="button"
            onClick={handlePublish}
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </div>
        </div>

        {error && <p className={styles.error}>{error.message}</p>}
      </form>
    </main>
  );
}