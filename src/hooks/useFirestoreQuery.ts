import { useEffect, useRef, useState } from "react";
import { onSnapshot } from 'firebase/firestore';

export function useFirestoreQuery(query: any) {
  const [docs, setDocs] = useState([]);

  const queryRef = useRef(query)

  useEffect(() => {

    const unsubscribe = onSnapshot(query, (querySnapshot: any) => {
      const data = querySnapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocs(data);
    });

    return unsubscribe;

  }, [queryRef]);

  return docs;
}