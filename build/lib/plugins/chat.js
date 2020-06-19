const styles = {
  black: "color:#000000",
  dark_blue: "color:#0000AA",
  dark_green: "color:#00AA00",
  dark_aqua: "color:#00AAAA",
  dark_red: "color:#AA0000",
  dark_purple: "color:#AA00AA",
  gold: "color:#FFAA00",
  gray: "color:#AAAAAA",
  dark_gray: "color:#555555",
  blue: "color:#5555FF",
  green: "color:#55FF55",
  aqua: "color:#55FFFF",
  red: "color:#FF5555",
  light_purple: "color:#FF55FF",
  yellow: "color:#FFFF55",
  white: "color:#FFFFFF",
  bold: "font-weight:900",
  strikethrough: "text-decoration:line-through",
  underlined: "text-decoration:underline",
  italic: "font-style:italic"
};
const dictionary = {
  'chat.stream.emote': '(%s) * %s %s',
  'chat.stream.text': '(%s) <%s> %s',
  // 'chat.type.achievement': '%s has just earned the achievement %s', // 1.8? Not tested
  // 'chat.type.advancement.task': '%s has just earned the advancement %s',
  // 'chat.type.advancement.goal': '%s has just reached the goal %s',
  // 'chat.type.advancement.challenge': '%s did a challenge lolol %s',
  'chat.type.admin': '[%s: %s]',
  'chat.type.announcement': '[%s] %s',
  'chat.type.emote': '* %s %s',
  'chat.type.text': '<%s> %s'
}

export function init(mineweb) {
  // Show chat
  document.getElementById("chat").style.display = "block";

  let inChat = false;
  // Esc event - Doesnt work with onkeypress?!
  document.onkeydown = function(e) {
    if (!inChat) return;
    e = e || window.event;
    if (e.keyCode === 27 || e.key === "Escape" || e.key === "Esc") {
      disableChat();
    }
  };

  // Chat events
  document.onkeypress = function(e) {
    e = e || window.event;
    if (e.code === "KeyT" && inChat === false) {
      enableChat();
      return false;
    } else if (e.code === "Enter") {
      if (!inChat) return;
      mineweb._client.write("chat", {
        message: document.getElementById("chatinput").value
      });
      disableChat();
    }
  };
  // Enable inputs back when focused
  document.addEventListener("pointerlockchange", function(event) {
    const canvas = document.getElementById("noa-canvas");
    if (
      document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas
    ) {
      // Someone focused the game back so we hide chat.
      inChat = false;
      hideChat();
    }
  });
  function enableChat() {
    // Set inChat value
    inChat = true;
    // Exit the pointer lock
    document.exitPointerLock();
    // Show chat input
    document.getElementById("chatinput").style.display = "block";
    document.getElementById("chatinput").focus();
    // Disable controls
    mineweb._noa.inputs.disabled = true;
  }
  function disableChat() {
    // Set inChat value
    inChat = false;
    // Hide chat
    hideChat();
    // Enable controls
    mineweb._noa.inputs.disabled = false;
    // Focus noa again
    const canvas = document.getElementById("noa-canvas");
    canvas.requestPointerLock =
      canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();
  }
  function hideChat() {
    // Clear chat input
    document.getElementById("chatinput").value = "";
    // Unfocus it
    document.getElementById("chatinput").blur();
    // Hide it
    document.getElementById("chatinput").style.display = "none";
  }

  function readExtra(extra) {
    const shouldReturn = [];
    for (var i in extra) {
      if (extra[i].text) {
        shouldReturn.push({
          text: extra[i].text,
          color: extra[i].color,
          bold: extra[i].bold ? true : false,
          italic: extra[i].italic ? true : false,
          underlined: extra[i].underlined ? true : false,
          strikethrough: extra[i].strikethrough ? true : false,
          obfuscated: extra[i].obfuscated ? true : false
        });
      } else {
        readExtra(extra).forEach(function(el) {
          shouldReturn.push(el);
        });
      }
    }
    return shouldReturn;
  }
  // Client part
  mineweb._client.on("chat", function(packet) {
    // Reading of chat message
    let fullmessage = JSON.parse(packet.message.toString());
    let msglist = [];
    if (
      fullmessage.extra &&
      fullmessage.extra.length > 0 &&
      !fullmessage.translate
    ) {
      msglist = readExtra(fullmessage.extra);
    } else if (fullmessage.text && fullmessage.text.length > 0) {
      msglist.push({ text: fullmessage.text, color: undefined });
    } else if (dictionary[fullmessage.translate]) {
        let msg = dictionary[fullmessage.translate]
        fullmessage.with.forEach(obj => {
          if (obj.insertion && obj.text) {
            msg = msg.replace('%s', obj.text)
          }
          if (obj.extra) {
            if (obj.text && obj.text.length > 0) {
              msglist.push({ text: obj.text, color: undefined });
            } else {
              const text = readExtra(obj.extra)
              if (text.length > 1) {
                console.log('Unsupported chat alert :(')
              }
              msg = msg.replace('%s', text[0].text)
              msglist.push({ text: msg, color: undefined })
            }
          }
          
        });
    } else {
      // msglist.push({
      //   text:
      //     "Unsupported message (Please report this):\n" +
      //     JSON.stringify(fullmessage),
      //   color: undefined
      // });
    }
    var ul = document.getElementById("chat");
    var li = document.createElement("li");
    msglist.forEach(msg => {
      var span = document.createElement("span");
      span.appendChild(document.createTextNode(msg.text));
      span.setAttribute(
        "style",
        `${msg.color ? styles[msg.color.toLowerCase()] : styles["white"]}; ${
          msg.bold ? styles["bold"] + ";" : ""
        }${msg.italic ? styles["italic"] + ";" : ""}${
          msg.strikethrough ? styles["strikethrough"] + ";" : ""
        }${msg.underlined ? styles["underlined"] + ";" : ""}`
      );
      li.appendChild(span);
    });
    ul.appendChild(li);
    ul.scrollTop = ul.scrollHeight; // Stay bottem of the list
  });
}
