import React, { Component } from "react";
import { render } from "react-dom";
import "./style/main.sass";

let data = {
  userInfo: {
    name: "Pectiflor",
    avatar:
      "https://image.noelshack.com/fichiers/2018/30/4/1532630382-avatar.png",
    id: "1",
    tid: "1351351",
    color: "#c0b283"
  },
  forumState: {
    forumList: [
      {
        name: "Communauté"
      },
      {
        name: "Activités"
      },
      {
        name: "Aventures"
      },
      {
        name: "Wi-Fi"
      },
      {
        name: "Stratégie"
      },
      {
        name: "ShinyHunting"
      },
      {
        name: "Artistes"
      },
      {
        name: "Staff"
      }
    ]
  },
  chatBox: {
    archives: 0,
    messages: [
      {
        msg: "Uiui c'est parfaitement normal !",
        date: "14:21:38",
        user: {
          name: "Pectiflor",
          color: "#c0b283",
          avatar:
            "https://image.noelshack.com/fichiers/2018/30/4/1532630382-avatar.png"
        }
      },
      {
        msg: "Jaaa tu m'as bien fait rire dans le tir de boue !",
        date: "15:12:10",
        user: {
          name: "Morujuanga",
          color: "#c0b283",
          avatar:
            "https://image.noelshack.com/fichiers/2018/30/4/1532633835-koko.png"
        }
      }
    ],
    users: [
      {
        name: "Pectiflor",
        avatar:
          "https://image.noelshack.com/fichiers/2018/30/4/1532630382-avatar.png",
        id: "1",
        color: "#c0b283",
        online: false
      },
      {
        name: "Morujuanga",
        avatar:
          "https://image.noelshack.com/fichiers/2018/30/4/1532633835-koko.png",
        id: "2",
        color: "#c0b283",
        online: true
      }
    ]
  }
};

class Channels extends Component {
  render() {
    let u = this.props.user;
    let fo = this.props.fo;
    return (
      <div className="pyuk-channels">
        {fo ? (
          <ul className="fo-list">
            {fo.forumList.map((forum, index) => {
              return (
                <li className="fo" key={index}>
                  <div className={`fo-icon fo-${index}`} />
                  <span className="fo-name">{forum.name}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          "blob"
        )}
        {this.props.user ? (
          <div className="u-box">
            <div
              className="u-avatar"
              style={{ backgroundImage: `url(${u.avatar})` }}
            />
            <div className="u-name">
              <strong style={{ color: `${u.color}` }}>{u.name}</strong>
            </div>
            <div className="u-tools">
              <span className="u-profile" />
              <span className="u-mp" />
            </div>
          </div>
        ) : (
          "zerz"
        )}
      </div>
    );
  }
}

class Members extends Component {
  render() {
    let mb = this.props.mb;
    return (
      <div className="Pyuk-members">
        {this.props.mb ? (
          <div>
            <h1 className="online">En ligne</h1>
            <ul className="mb-online">
              {mb.map((user, index) => {
                return (
                  user.online && (
                    <li className="mb-user" key={index}>
                      <div
                        className="mb-avatar"
                        style={{ backgroundImage: `url(${user.avatar})` }}
                      />
                      <span>
                        <strong style={{ color: `${user.color}` }}>
                          {user.name}
                        </strong>
                      </span>
                    </li>
                  )
                );
              })}
            </ul>
            <h1 className="offline">Absents</h1>
            <ul className="mb-offline">
              {mb.map((user, index) => {
                return (
                  !user.online && (
                    <li className="mb-user" key={index}>
                      <div
                        className="mb-avatar"
                        style={{ backgroundImage: `url(${user.avatar})` }}
                      />
                      <span>
                        <strong style={{ color: `${user.color}` }}>
                          {user.name}
                        </strong>
                      </span>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        ) : (
          "ble"
        )}
      </div>
    );
  }
}

class Chat extends Component {
  render() {
    let msg = this.props.msg;
    return (
      <div className="pyuk-chat">
        <div className="chat">
          {msg
            ? msg.map((message, index) => {
                return (
                  <div className="chat-msg" key={index}>
                    <div
                      className="msg-avatar"
                      style={{ backgroundImage: `url(${message.user.avatar})` }}
                    />
                    <div className="msg">
                      <h2>
                        <span className="msg-author">
                          <strong style={{ color: `${message.user.color}` }}>
                            {message.user.name}
                          </strong>
                        </span>
                        <span className="msg-date">
                          {message.date.match(/\d*:\d*/)[0]}
                        </span>
                      </h2>
                      <div className="msg-content">{message.msg}</div>
                    </div>
                  </div>
                );
              })
            : "ble"}
        </div>
        <div className="chat-footer">
          <form className="chat-tools">
            {this.props.archives ? (
              <input
                placeholder="Rechercher dans les archives"
                type="text"
                onKeyUp={event => this.props.onTextChange(event.target.value)}
              />
            ) : (
              <div className="chat-input">
                <input
                  className="input"
                  type="text"
                  placeholder="Envoyer un message"
                />
                <button className="input-emoji" />
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ""
    };
  }
  componentDidMount() {
    this.setState({ serverData: data });
  }
  render() {
    let svData = this.state.serverData;
    return (
      <div className="Pyuk">
        <header />
        <main>
          <Channels
            fo={svData.forumState && svData.forumState}
            user={svData.userInfo && svData.userInfo}
          />
          <Chat
            archives={svData.chatBox && svData.chatBox.archives}
            onTextChange={text => this.setState({ filterString: text })}
            msg={
              svData.chatBox &&
              svData.chatBox.messages.filter(msg => {
                return svData.chatBox.archives
                  ? msg.msg
                      .toLowerCase()
                      .includes(this.state.filterString.toLowerCase())
                  : msg;
              })
            }
          />
          <Members mb={svData.chatBox && svData.chatBox.users} />
        </main>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
