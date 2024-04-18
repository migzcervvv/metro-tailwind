import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebaseConfig"; // Adjust the path to firebaseConfig

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = collection(database, "parameters");
        const querySnapshot = await getDocs(value);

        const newData = [];

        querySnapshot.forEach((doc) => {
          const parameter = doc.data();
          newData.push(parameter);
        });

        console.log("Data fetched:", newData);
        setData(newData);
        setLoading(!data.length === true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      <h1>Firestore Data</h1>
      {!loading && data.length > 0 && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyComponent;
