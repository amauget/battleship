class Alert{
  constructor(){
    this.alert = document.querySelector('.alert')
  }
  welcome(){
    let command = document.createElement('p')
    command.textContent = 'Message From High Command:'
    command.className = 'command'

    let message = document.createElement('p')
    message.textContent = 'Captain, position your fleet and prepare to fire!'
    message.className = 'message'

    let admiral = document.createElement('img')
    admiral.className = 'admiral'
    admiral.src = './externalItems/admiral.jpeg'

    let hint = document.createElement('p')
    hint.textContent = 'hint: you can toggle your ship from horizontal to vertical by clicking the scroll button on your mouse while hovering over the grid.'
    hint.className = 'hint'

    let okayBtn = document.createElement('button')
    okayBtn.textContent = 'Okay'
    okayBtn.className = 'okay'

    this.alert.append(command,message, admiral, hint, okayBtn)

    return this.alert
  }
  hide(){
    this.alert.innerHTML = ''
    this.alert.style.display = 'none'
  }
}

module.exports = Alert
