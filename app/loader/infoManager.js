import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../database/firebase.js';

export function loadInfo(){
    const q = query(collection(db, "infos"), orderBy("order"));
    return new Promise((resolve) => {
        let infos = [];
        const unsubscribe = async() => {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                infos.push(doc.data());
              });
            resolve(infos);
        }
        return unsubscribe();
    });
}