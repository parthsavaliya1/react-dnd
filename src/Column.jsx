import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constant";
import DropZone from "./DropZone";
import Component from "./Component";

const style = {
    marginRight: '10px', // Adding 10px margin right between cards
    display: 'flex', // Use flexbox
    alignItems: 'center', // Center items vertically
    cursor: "pointer",
    pointerEvent: "none"
};

const Column = ({ data, components, handleDrop, path }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: COLUMN,
            id: data.id,
            children: data && data.children,
            path
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
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
            onClick={() => console.log(data.id)}

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

        </div>
    );
};
export default Column;
