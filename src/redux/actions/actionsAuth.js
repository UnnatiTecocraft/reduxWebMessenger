import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    loginUserFail,
    loginUserRequest,
    loginUserSuccess,
    logoutUserFail,
    logoutUserRequest,
    logoutUserSuccess,
} from "./actions";
import "../../firebaseConfig";

const db = getFirestore();
const auth = getAuth();

export const signUp = (user) => {
    return async (dispatch) => {
        dispatch(loginUserRequest());

        createUserWithEmailAndPassword(auth, user.email, user.password).then((data) => {
            const currentUser = auth.currentUser;
            const name = `${user.firstName} ${user.lastName}`;
            updateProfile(currentUser, { displayName: name })
                .then(async () => {
                    await setDoc(doc(db, "users", data.user.uid), {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        uid: data.user.uid,
                        createAt: new Date(),
                        isOnline: true,
                    })
                        .then(() => {
                            const loggedInUser = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                uid: data.user.uid,
                                email: user.email,
                            };
                            localStorage.setItem("user", JSON.stringify(loggedInUser));
                            console.log("user loggin successfully....");
                            dispatch(loginUserSuccess(loggedInUser));
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(loginUserFail(error));
                        });
                })
                .catch((error) => console.log(error));
        });
    };
};

export const signIn = (user) => {
    return async (dispatch) => {
        dispatch(loginUserRequest());

        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async (data) => {
                await updateDoc(doc(db, "users", data.user.uid), {
                    isOnline: true,
                })
                    .then(() => {
                        const name = data.user.displayName.split(" ");
                        const firstName = name[0];
                        const lastName = name[1];

                        const loggedInUser = {
                            firstName,
                            lastName,
                            uid: data.user.uid,
                            email: data.user.email,
                        };
                        localStorage.setItem("user", JSON.stringify(loggedInUser));
                        dispatch(loginUserSuccess(loggedInUser));
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => {
                console.log(error);
                dispatch(loginUserFail(error));
            });
    };
};

export const isLoggedInUser = () => {
    return async (dispatch) => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        if (user) {
            dispatch(loginUserSuccess(user));
        } else {
            dispatch(loginUserFail("Login agian please"));
        }
    };
};

export const logOut = (uid) => {
    return async (dispatch) => {
        dispatch(logoutUserRequest());

        await updateDoc(doc(db, "users", uid), {
            isOnline: false,
        })
            .then(() => {
                signOut(auth)
                    .then(() => {
                        localStorage.clear();
                        dispatch(logoutUserSuccess());
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch(logoutUserFail(error));
                    });
            })
            .catch((error) => console.log(error));
    };
};
