// SampleComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirebaseData } from "../redux/store";

const SampleComponent = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.data); // Destructure data and error from the state

  useEffect(() => {
    dispatch(fetchFirebaseData());
  }, [dispatch]);

  return (
    <div className="p-40">
      <h2>Sample Component</h2>
      {/* Check for error */}
      {error && <div>Error: {error.message}</div>}
      {/* Display fetched data */}
      {data && (
        <ul>
          <li>
            CO (Carbon Monoxide):{" "}
            {data["CO (Carbon Monoxide)"] &&
            data["CO (Carbon Monoxide)"]["Value"] &&
            Object.keys(data["CO (Carbon Monoxide)"]["Value"])[0]
              ? data["CO (Carbon Monoxide)"]["Value"][
                  Object.keys(data["CO (Carbon Monoxide)"]["Value"])[0]
                ]
              : ""}
          </li>
          <li>
            Humidity:{" "}
            {data["Humidity"] &&
            data["Humidity"]["Value"] &&
            Object.keys(data["Humidity"]["Value"])[0]
              ? data["Humidity"]["Value"][
                  Object.keys(data["Humidity"]["Value"])[0]
                ]
              : ""}
          </li>
          <li>
            O3 (Ozone):{" "}
            {data["O3 (Ozone)"] &&
            data["O3 (Ozone)"]["Value"] &&
            Object.keys(data["O3 (Ozone)"]["Value"])[0]
              ? data["O3 (Ozone)"]["Value"][
                  Object.keys(data["O3 (Ozone)"]["Value"])[0]
                ]
              : ""}
          </li>
          <li>
            PM10:{" "}
            {data["PM10"] &&
            data["PM10"]["Value"] &&
            Object.keys(data["PM10"]["Value"])[0]
              ? data["PM10"]["Value"][Object.keys(data["PM10"]["Value"])[0]]
              : ""}
          </li>
          <li>
            PM25:{" "}
            {data["PM25"] &&
            data["PM25"]["Value"] &&
            Object.keys(data["PM25"]["Value"])[0]
              ? data["PM25"]["Value"][Object.keys(data["PM25"]["Value"])[0]]
              : ""}
          </li>
          <li>
            Temperature:{" "}
            {data["Temperature"] &&
            data["Temperature"]["Value"] &&
            Object.keys(data["Temperature"]["Value"])[0]
              ? data["Temperature"]["Value"][
                  Object.keys(data["Temperature"]["Value"])[0]
                ]
              : ""}
          </li>
          <li>
            VOC (Volatile Organic Compounds):{" "}
            {data["VOC (Volatile Organinc Compounds)"] &&
            data["VOC (Volatile Organinc Compounds)"]["Index"] &&
            Object.keys(data["VOC (Volatile Organinc Compounds)"]["Index"])[0]
              ? data["VOC (Volatile Organinc Compounds)"]["Index"][
                  Object.keys(
                    data["VOC (Volatile Organinc Compounds)"]["Index"]
                  )[0]
                ]
              : ""}
          </li>
        </ul>
      )}
    </div>
  );
};

export default SampleComponent;
