import { doc, getDoc, deleteDoc, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../database/firebase.js';
// import { getNarrowbandResult, getNotchedResult, getPan, getAllFrequency } from "../../modules/tone";
import { Timestamp } from '@firebase/firestore';

const nh_range = {
    500: { min: 15.3, max: 24.5 },
    1000: { min: 18.3, max: 29.7 },
    2000: { min: 23.89, max: 34.61 },
    4000: { min: 27.05, max: 40.57 },
    8000: { min: 23.5, max: 40.22 },
};

export function loadCurrentTest(test_id){
    return new Promise((resolve) => {
        const unsubscribe = async() => {
            data = {}
            // const docRefR = doc(db, "test", test_id, 'readings', 'right');
            // const docSnapR = await getDoc(docRefR);
            // let current = docSnapR.data();
            // data.notched_right = current.notched;
            // data.narrowband_right = current.narrowband;
            // data.FS_right = current.FS;
            // data.status_right = current.status;
            // const docRefL = doc(db, "test", test_id, 'readings', 'left');
            // const docSnapL = await getDoc(docRefL);
            // current = docSnapL.data();
            // data.notched_left = current.notched;
            // data.narrowband_left = current.narrowband;
            // data.FS_left = current.FS;
            // data.status_left = current.status;
            // console.log(data);
            // resolve(data);
            // console.log(data);
            const docRef = doc(db, "test", test_id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
            let current = docSnap.data();
            data.date = current.date.toDate().toString();
            data.notched = current.notched;
            data.narrowband = current.narrowband;
            data.FS = current.FS;
            data.status = current.status;
            data.side = current.side;
            data.type = current.type;
            data.nh_range = nh_range;
            resolve(data)
            console.log(data)
        }
        return unsubscribe();
    });
}

export async function deleteUserReport(uid){
    const q = query(collection(db, "test"), where("userID", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        deleteData(doc.id)
    });
}

export async function deleteData(test_id){
    await deleteDoc(doc(db, "test", test_id));
}

export function addData(toneModule){
    return new Promise((resolve) => {
        const unsubscribe = async() => {
            console.log("hi")
            nbresult = toneModule.getNarrowbandResult()
            nnresult = toneModule.getNotchedResult()
            frequencies = toneModule.getAllFrequency()

            let pan = "left"
            if(toneModule.getPan() == 1){
                pan = "right"
            }

            let type = "full"
            if(frequencies.length == 2){
                type = "short"
            }

            let narrow = {}
            for(let i = 0; i < frequencies.length; i++){
                narrow[frequencies[i]]= nbresult[i]
            }

            let notched = {}
            for(let i = 0; i < frequencies.length; i++){
                notched[frequencies[i]]= nnresult[i]
            }

            let status = "pass"
            const fs_data = Object.keys(narrow).reduce((result, key) => {
                const difference = narrow[key] - notched[key];
                if(difference > nh_range[key].max || difference < nh_range[key].min){
                    status = "fail"
                }
                result[+key] = difference;
                return result;
            }, {});

            try {
                const docRef = await addDoc(collection(db, "test"), {
                    userID: auth.currentUser.uid,
                    date: Timestamp.now(),
                    type: type,
                    status: status,
                    side: pan,
                    notched: notched,
                    narrowband: narrow,
                    FS: fs_data
                });
                const data = {id: docRef.id}
                resolve(data)
            } catch (error) {
                console.error("Error adding test results:", error);
            }
        }
        return unsubscribe();
    });
}
