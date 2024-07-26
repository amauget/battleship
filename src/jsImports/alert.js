class Alert{
  constructor(){
    this.alert = document.querySelector('.alert')
    this.admiral = this.admiralInfo()
    this.command = this.commandInfo()
    this.message = this.messageInfo()
    this.button = this.buttonInfo()
  }
  admiralInfo(){
    let admiral = document.createElement('img')
    admiral.className = 'admiral'
    admiral.src = './externalItems/admiral.jpeg'
    return admiral
  }
  commandInfo(){
    let command = document.createElement('p')
    command.textContent = 'Message From High Command:'
    command.className = 'command'
    return command
  }
  messageInfo(){
    let message = document.createElement('p')
    message.className = 'message'
    return message
  }
  buttonInfo(){
    let okayBtn = document.createElement('button')
    okayBtn.className = 'okay'
    return okayBtn
  }

  welcome(){
    this.message.textContent = 'Captain, position your fleet and prepare to fire!'

    let hint = document.createElement('p')
    hint.textContent = 'hint: you can toggle your ship from horizontal to vertical by clicking the scroll button on your mouse while hovering over the grid.'
    hint.className = 'hint'

    this.button.textContent = 'Okay'
 

    this.alert.append(this.command, this.message, this.admiral, hint, this.button)

    return this.alert
  }
  hide(){
    this.alert.innerHTML = ''
    this.alert.style.display = 'none'
  }
  showAlert(){
    this.alert.style.display = 'grid'
  }
  hitMessage(ship){ /* ship is actually ship.name */
    this.message.textContent = `Hit: ${ship}`

    this.alert.append(this.command, this.message, this.admiral)

    this.showAlert()

  setTimeout(() => {
      this.hide()
  }, 1000);
    // this.alert.style.width = '20vw'
  }
}

module.exports = Alert
