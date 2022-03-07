import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMessages, getUsers, updateMessage } from "../../redux/actions/actionsUser";
import Layout from "../Layout/Layout";
import "./styleHome.css";

const User = (props) => {
    const { user, onClick } = props;
    return (
        <div className="displayName" onClick={() => onClick(user)}>
            <div className="displayPic">
                <img
                    src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
                    alt=""
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    margin: "0 10px",
                }}>
                <span
                    style={{
                        fontWeight: 500,
                    }}>
                    {user.firstName} {user.lastName}
                </span>
                <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`} />
            </div>
        </div>
    );
};

const Home = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const users = useSelector((state) => state.users.users);
    const conversations = useSelector((state) => state.users.conversations);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState("");
    const [chatUserUid, setChatUserUid] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getUsers(auth.loggedInUser.uid));
    }, []);

    const initChat = (user) => {
        setChatStarted(true);
        setChatUser(`${user.firstName} ${user.lastName}`);
        setChatUserUid(user.uid);
        dispatch(getMessages({ uid_1: auth.loggedInUser.uid, uid_2: user.uid }));
    };

    const submitMessage = () => {
        const msgObj = {
            user_uid_1: auth.loggedInUser.uid,
            user_uid_2: chatUserUid,
            message,
        };
        if (message !== "") {
            dispatch(updateMessage(msgObj));
        }
        setMessage("");
    };

    return (
        <Layout>
            <section className="container">
                <div className="listOfUsers">
                    {users.length > 0
                        ? users.map((user) => {
                              return <User key={user.uid} user={user} onClick={initChat} />;
                          })
                        : null}
                </div>
                <div className="chatArea">
                    <div className="chatHeader">{chatStarted ? chatUser : null}</div>

                    <div className="messageSections">
                        {chatStarted
                            ? conversations.map((con, index) => (
                                  <div
                                      style={{
                                          textAlign:
                                              con.user_uid_1 == auth.loggedInUser.uid ? "right" : "left",
                                      }}
                                      key={index}>
                                      <p className="messageStyle">{con.message}</p>
                                  </div>
                              ))
                            : null}
                    </div>

                    <div className="chatControls">
                        {chatStarted ? (
                            <>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write message"
                                />
                                <button onClick={submitMessage}>Send</button>
                            </>
                        ) : null}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
