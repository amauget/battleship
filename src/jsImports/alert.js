class Alert{
  constructor(){
    this.alert = document.querySelector('.alert')
    this.hitLog = document.querySelector('.hitLog')
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
  displayHitLog(){
    let title = document.querySelector('.title')
    title.style.display = 'block'
    return this.hitLog.className = 'hitLogShowing'
  }
  welcome(){
    this.message.textContent = 'Captain, position your fleet and prepare to fire!'

    let hintContainer = document.createElement('div')
    hintContainer.className = 'hintContainer'

    let hint = document.createElement('p')
    hint.textContent = 'Hint: You can toggle your ship from horizontal to vertical by clicking the scroll button on your mouse while hovering over the grid.'
    hint.className = 'hint'

    let mouseIcon = document.createElement('img')
    mouseIcon.className = 'mouseIcon'
    mouseIcon.src = './externalItems/mouse.jpeg'

    hintContainer.append(hint,mouseIcon)

    this.button.textContent = 'Okay'
 

    this.alert.append(this.command, this.message, this.admiral, hintContainer, this.button)
    this.alert.id = 'welcome'

    return this.alert
  }
  openFire(){
    this.alert.id = 'welcome'
    this.alert.style.display = 'grid'
    let title = this.commandInfo()
    this.message.textContent = 'Open Fire!'

    this.alert.append(this.message, title, this.admiral)
    this.timeout(1)

  }
  result(winner){
    let title = document.createElement('h2')
    title.style.fontSize = '2rem'

    if(winner === 'player'){
      title.textContent = 'Victory!'
      this.message.textContent = "We have won! You truly are a master of the seas."
    }
    else{
      title.textContent = 'Defeat'
      this.message.textContent = "We may have lost the battle, but we will never lose the war. "
    }
    
    this.message.style.padding = '1rem'

    this.alert.append(title, this.message, this.admiral)
    this.alert.id = 'welcome'
    this.showAlert()


  }
  hide(){
    this.alert.innerHTML = ''
    this.alert.style.display = 'none'
    this.alert.id = 'alert'
  }
  showAlert(){
    this.alert.style.display = 'grid'
  }
  appendHitLog(shipName, message, color){ 
    let listContainer = document.querySelector('.listContainer')
    let list = document.createElement('p')
    list.className = 'list'
    list.textContent = `${message}: ${shipName}`
    list.style.color = color
    listContainer.appendChild(list)
    
    this.hitLog.scrollTop = listContainer.scrollHeight 
    //scroll to bottom when new text is appended ^^ 
    
  }
  playAgain(){
    let button = document.createElement('button')
    button.className = 'playAgain'
    button.textContent = 'Play Again'

    let body = document.querySelector('body')

    body.appendChild(button)
  }
  openFire(){
    let title = document.createElement('h2')
    title.textContent = 'Message From High Command:'

    this.message.textContent = 'Open Fire!'
    this.alert.append(title, this.message, this.admiral)
    this.alert.id = 'openFire'
    this.alert.style.display = 'grid'
  }
  
  timeout(time){
    setTimeout(() => {
      this.hide()
    }, time);
    
  }

  
}

module.exports = Alert
