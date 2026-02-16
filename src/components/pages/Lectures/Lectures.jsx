import styles from "./Lectures.module.css";
import { useNavigate } from 'react-router';
import { useLectures } from "../../../hooks/useLectures";
import { useLogos } from "../../../utils/useLogos";
import { useState } from 'react';
import { Spin } from 'antd'; // Import Spin component from antd


export default function Lectures() {
    const navigate = useNavigate();
    const { lectures, isLoading, error } = useLectures();
    const { getLogoUrl } = useLogos();
    const [filters, setFilters] = useState({
        type: [],
        content: []
    }); 

    const handleClick = (id) => {
        navigate(`/lecture/${id}`)
    };

    const handleFilterChange = (category, value) => {
        setFilters((prevFilters) => {
            const updatedCategory = prevFilters[category].includes(value)
                ? prevFilters[category].filter((item) => item !== value)
                : [...prevFilters[category], value];

            return {
                ...prevFilters,
                [category]: updatedCategory
            };
        });
    };

    const filteredLectures = lectures.filter((lecture) => {
        const normalizedTags = lecture.tags.map((tag) => tag.toLowerCase());
        const normalizedLogos = lecture.logos.map((logo) => logo.toLowerCase());

        const matchesType =
            filters.type.length === 0 ||
            filters.type.includes("all") || // Show all if "all" is selected
            filters.type.some((type) => normalizedLogos.includes(type.toLowerCase()));

        const matchesContent =
            filters.content.length === 0 ||
            filters.content.some((content) => normalizedTags.includes(content.toLowerCase()));

        return matchesType && matchesContent;
    });

    if (isLoading) {
        return (
            <div style={{ 
                position: "fixed", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                backgroundColor: "white", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center" 
            }}>
                <Spin size="large" />
            </div>
        );
    }
    if (error) return <p>Error loading lectures: {error.message}</p>;

    return (
        <main className={styles.main}>
            {/* FILTERS */}
            <div className={styles.filters}>
                <div className={styles.filtersInner}>
                    <div className={styles.filterGroup}>
                        <strong>Type</strong>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("type", "all")}
                                checked={filters.type.includes("all")}
                            />
                            All
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("type", "HTML")}
                                checked={filters.type.includes("HTML")}
                            />
                            HTML
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("type", "CSS")}
                                checked={filters.type.includes("CSS")}
                            />
                            CSS
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("type", "JS")}
                                checked={filters.type.includes("JS")}
                            />
                            JS
                        </label>
                    </div>

                    <div className={styles.filterGroup}>
                        <strong>Content</strong>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("content", "Information")}
                                checked={filters.content.includes("Information")}
                            />
                            Information
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("content", "Video")}
                                checked={filters.content.includes("Video")}
                            />
                            Video
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("content", "Resources")}
                                checked={filters.content.includes("Resources")}
                            />
                            Resources
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleFilterChange("content", "Task")}
                                checked={filters.content.includes("Task")}
                            />
                            Task
                        </label>
                    </div>
                </div>

                <div className={styles.filtersAction}>
                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => setFilters({ type: [], content: [] })}
                    >
                        Clear filters
                    </button>
                </div>
            </div>

            {/* LECTURES */}
            {filteredLectures.map((lecture) => (
                <div
                    key={lecture.id}
                    className={styles.lecture}
                    onClick={() => handleClick(lecture.id)}
                >
                    <img
                        className={styles.thumb}
                        src={lecture.thumbUrl}
                        alt="lecture thumbnail"
                    />

                    <h1 className={styles.header}>{lecture.title}</h1>

                    <p className={styles.description}>{lecture.description.split(/\s+/).slice(0, 20).join(" ")}{lecture.description.split(/\s+/).length > 20 ? "..." : ""}</p>

                    <ul className={styles.tags}>
                        {lecture.tags.map((tag, i) => (
                            <li key={i} className={styles.tag}>
                                {tag}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.logos}>
                        {lecture.logos.map((logo, i) => (
                            <img key={i} src={getLogoUrl(logo)} className={styles.logo} alt="tech" />
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}