import { useState, useRef } from "react";

function FilterGroup<T extends string>({ title, options, selected, onToggle }: {
    title: string;
    options: readonly T[];
    selected: T[];
    onToggle: (value: T) => void;
}) {
    const [expanded, setExpanded] = useState(true);
    const bodyRef = useRef<HTMLDivElement>(null);

    return (
        <div className="filter-group">
            <button
                className="filter-group-header"
                onClick={() => setExpanded((current) => !current)}
                aria-expanded={expanded}
            >
                <h3 className="eyebrow">{title}</h3>
                <span className={`filter-chevron ${expanded ? "expanded" : ""}`}>▾</span>
            </button>

            <div
                className={`filter-group-body ${expanded ? "expanded" : ""}`}
                ref={bodyRef}
                style={{ maxHeight: expanded ? `${bodyRef.current?.scrollHeight ?? 500}px` : "0px" }}
            >
                {options.map((opt) => (
                    <label key={opt} className="filter-row">
                        <input
                            type="checkbox"
                            checked={selected.includes(opt)}
                            onChange={() => onToggle(opt)}
                        />
                        {opt}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default FilterGroup;