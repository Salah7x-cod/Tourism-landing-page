import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { destinations as fallbackDestinations } from "../data/destinations";

export function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api
      .destinations()
      .then((data) => {
        if (!active) return;
        setDestinations(data);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setDestinations(fallbackDestinations);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { destinations, loading, error };
}
