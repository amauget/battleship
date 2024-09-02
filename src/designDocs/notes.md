Designing PC search:
  search process starts with origin's default search position.
  Audits cell selected status
    if selected === true, 
    new coord is calculated and function calls again recursively
    else
      a marker is created from attack handling
        "Attack Handling": 
          creates an x marker DOM element
          calls receive attack -> returns 'hit', 'miss', or 'undefined'(already attacked)
          if miss -> marker color = white
          if red -> marker color = red

        returns marker
      
      cells var declared via query selector all. Selects all player Cells (eventually)
      cells iterates each cell. 
      if cell value === created coord
        marker is appended
      
      INSERT TOGGLE TURN PROMISE.. 
      it shouldn't exit. Just wait here until turn condition is met

      if marker color is red (Implies hit... I really dislike this line of logic)
        call hit pattern breakout function
      else
        update cell coord and call recursively