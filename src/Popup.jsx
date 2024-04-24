import React, { useState } from "react";

const Popup = ({ onClose, onSelect, onApply, isPopupOpen }) => {
    const [selectedChartType, setSelectedChartType] = useState(null);

    const handleSelectChange = (e) => {
        setSelectedChartType(e.target.value); // Update the selected chart type
    };

    const handleApply = () => {
        if (selectedChartType) {
            onSelect(selectedChartType); // Call the onSelect function with the selected chart type
            onApply(); // Call the onApply function to close the popup
        } else {
            onClose(); // Close the popup if no chart type is selected
        }
    };


    return (
        isPopupOpen && (
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <h2>Select Chart Type</h2>
                        <button className="close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <select onChange={handleSelectChange} value={selectedChartType || ""}>
                            <option value="">Select Chart Type</option>
                            <option value="bar">Bar Chart</option>
                            <option value="line">Line Chart</option>
                            <option value="pie">Pie Chart</option>
                            {/* Add more options for other chart types */}
                        </select>
                        <button onClick={handleApply}>Apply</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Popup;
