import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constant";
import DropZone from "./DropZone";
import Component from "./Component";
import Popup from "./Popup";

const style = {
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    pointerEvent: "none",
};

const Column = ({ data, components, handleDrop, path }) => {
    const ref = useRef(null);
    const [isPopupOpen, setPopupOpen] = useState(false); // State to control the popup
    const [selectedChart, setSelectedChart] = useState(null); // State to track the selected chart type

    const handleColumnClick = () => {
        setPopupOpen(true); // Open the popup when the column is clicked
    };

    const handleChartSelect = (chartType) => {
        setSelectedChart(chartType); // Update the selected chart type
    };

    const handleApply = () => {
        setPopupOpen(false); // Close the popup after clicking Apply
    };

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: COLUMN,
            id: data.id,
            children: data && data.children,
            path,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);

    const renderComponent = (component, currentPath) => {
        return (
            <Component
                key={component.id}
                data={component}
                components={components}
                path={currentPath}
            />
        );
    };

    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            className="base column"
            draggable="false"
            onClick={handleColumnClick} // Call handleColumnClick when the column is clicked
        >
            {data.id}
            {data.children.map((component, index) => {
                const currentPath = `${path}-${index}`;

                return (
                    <React.Fragment key={component.id}>
                        {renderComponent(component, currentPath)}
                    </React.Fragment>
                );
            })}
            <Popup
                onClose={() => setPopupOpen(false)}
                onSelect={handleChartSelect}
                onApply={handleApply} // Pass handleApply function as onApply prop
                isPopupOpen={isPopupOpen} // Pass isPopupOpen state to the Popup component
            />
        </div>
    );
};

export default Column;
