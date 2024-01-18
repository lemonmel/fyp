import { useState } from 'react';
import { doc, collection, query, where, onSnapshot, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from '../database/firebase.js';

export function loadAllHistory() {
    const user = auth.currentUser;
    const q = query(collection(db, "test"), where("userID", "==", user.uid), orderBy("date", "desc"));

    return new Promise((resolve, reject) => {
        const testing = [];
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
          for (const doc of querySnapshot.docs) {
            const currentDoc = {
              id: doc.id,
              date: doc.data().date.toDate().toDateString(),
              type: doc.data().type,
              status: doc.data().status,
              side: doc.data().side
            };
            // console.log(currentDoc);
            testing.push(currentDoc);
          }
          resolve(testing);
        });
    });
}

