hitPattern(hitCell){
  //  search pattern stored 
    let ship = this.search.firstHit
    console.log(ship)
    if(ship.sunk === true){
      return
    }
    let board = this.attackedPlayer.board
    try{
      let coord = hitCell[this.search.hitSearch[0]].toString()
      let marker = this.attackHandling(coord)
      this.appendHitMarker(coord, marker)

      let attackCell = board[coord]

      if(attackCell.occupied === false){
        console.log('miss')
        this.search.hitSearch.splice(0,1)
      }
      else{
        console.log('hit')
     
      }
      setTimeout(() =>{this.hitPattern(attackCell)}, 750)
    }
    catch(error){
      if(error instanceof TypeError){ /* catches null values in cell linked list */
        console.log(null)
        this.search.hitSearch.splice(0,1) /* takes off null direction */
        coord = this.search.firstHit[this.search.hitSearch[0]].toString() /* applied next direction to OG value */ 
        console.log(coord)
        this.hitPattern(board[coord])
      } 
    }
    
  

   



  }