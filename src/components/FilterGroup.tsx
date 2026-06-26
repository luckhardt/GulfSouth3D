//this creates a reusable filter group and works for any list of string operations

function FilterGroup<T extends string>({
    title,
    options,
    selected,
    onToggle,

}: {
    title: string;
    options: readonly T[];
    selected: T[];
    onToggle: (value: T) => void;
}) {
    return (
        <div className="filter-group">
            <h3 className="eyebrow">{title}</h3>
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
    );
}

export default FilterGroup;