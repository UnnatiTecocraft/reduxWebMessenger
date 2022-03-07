import {
    getMessagesFail,
    getMessagesRequest,
    getMessagesSuccess,
    getUserRequest,
    getUserSuccess,
} from "./actions";
import { collection, query, where, onSnapshot, getFirestore, addDoc, orderBy } from "firebase/firestore";
import "../../firebaseConfig";

const db = getFirestore();

export const getUsers = (uid) => {
    return async (dispatch) => {
        dispatch(getUserRequest());

        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().uid != uid) {
                    users.push(doc.data());
                }
            });
            dispatch(getUserSuccess(users));
        });
    };
};

export const updateMessage = (msgObj) => {
    return async (dispatch) => {
        await addDoc(collection(db, "conversations"), {
            ...msgObj,
            isView: false,
            createAt: new Date(),
        })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.log(error));
    };
};

export const getMessages = (user) => {
    return async (dispatch) => {
        dispatch(getMessagesRequest());

        const q = query(
            collection(db, "conversations"),
            where("user_uid_1", "in", [user.uid_1, user.uid_2]),
            orderBy("createAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const conversations = [];
            querySnapshot.forEach((doc) => {
                if (
                    (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2) ||
                    (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                ) {
                    conversations.push(doc.data());
                }
            });
            if (conversations.length > 0) {
                dispatch(getMessagesSuccess(conversations));
            } else {
                dispatch(getMessagesFail(conversations));
            }
        });
    };
};
