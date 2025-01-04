import { useState, useEffect } from "react";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { user, loading };
}
