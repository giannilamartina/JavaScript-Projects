const { StreamChat } = require("stream-chat");

//global variables
let client, channel, username, activeUser;

client = new StreamChat(jy78dd3ys65b);

async function generateToken(username) {
    const { token } = (await axios.get(`/token?username=${username}`)).data;
    return token;
}

async function initializeClient() {
    const token = await generateToken(username);
  
    await client.setUser(
      {
        id: username,
        name: 'The user name', // Update this name dynamically
        image: 'https://bit.ly/2u9Vc0r' // user image
      },
      token
    ); // token generated from our Node server
  
    return client;
  }

  const user = document.getElementById('user-login-input');

  user.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
          checkAuthState();
      }
  });

  checkAuthState();

  async function checkAuthState() {
      if (!user.value) {
          document.getElementById('login-block').style.display = 'grid';
          document.getElementsByClassName('chat-container')[0].style.display = 'none';
      } else {
          username = user.value;

          await initializeClient();

          document.getElementsByClassName('chat-container')[0].style.display = 'grid';
          document.getElementById('login-block').style.display = 'none';
      }
  }