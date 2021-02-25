 const socket = io("http://localhost:3000");
 const msgArr = []
 socket
   .on("connect", () => {
     console.log(socket.connected);
     socket.emit("sendMessage", navigator.userAgent);
   })

class Chat extends React.Component {
  state = {
    name: '',
    msgs: [],
    send: React.createRef(),
    inputName: React.createRef()
  }
  componentDidMount() {
    console.log('监听用户发送时间')
    socket.on('_say', (data) => {
      console.log(data)
      this.state.msgs.push(data);
      this.setState({
        msgs: this.state.msgs
      })
      console.log(this.state.msgs)
    })
  }
  // ts-ignore
  sendMsg = () => {
    console.log(this.state.send.current.value)
    const { value } = this.state.send.current
    if(socket.connected&&value) {
      socket.emit('say',{
        name: this.state.name,
        msg: value
      })
    }
  }
  sendName = () => {
    console.log(this.state.inputName.current.value)
    const { value } = this.state.inputName.current
    if(socket.connected&&value) {
      this.setState({
        name: value,
      });
      socket.emit('join', {
        name: value
      })
    }
  }
  render() {
    console.log(234)
    const { name,msgs, send, inputName } = this.state
    return (
      <div>
        {!!name ? (
          <div class="chat">
            {msgs.map((val) => {
              console.log(val.name)
              return <p>{val.name + "：" + val.msg}</p>;
            })}
            <input type="text" ref={send} />
            <button type="button" onClick={this.sendMsg}>
              发送
            </button>
          </div>
        ) : (
          <div>
            <input type="text" ref={inputName} />
            <button type="button" onClick={this.sendName}>
              确定
            </button>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Chat/>,document.querySelector('#app'))