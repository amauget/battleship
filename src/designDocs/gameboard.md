game board should be graphed at 10x10.

Two contending schools of thought on how to design:
  
  Design the graph as coordinates are selected:
    pros:
      I've done similar in knights travaile project.
      Given a range limit, the coordinate design can be added by the user in realtime.
      Previously selected positions can prevent reselection through if coordinates -> defined, then square is inelligible for selection

    concerns:
      May be tricky to link with DOM elements. Code risks getting messy.
      
      Relational positioning could be an issue, as a placed ship occupies x amount of cells. If they aren't created until placement of ship, how will all cells of location 
      be accurately indicated?

      How can I enforce range parameters during the placement of ships if the grid doesn't already exist?

    initial schematic:
      DOM grid is assembled with the string version of represented coordinates for class.
      When specific grid is clicked, className becomes name of obj, 


  Have a graph that is already filled out and stored as objects.
    Pros:
      My initial thoughts are that it may be easier to associate with DOM if it's already created.

    Concerns:
      Object may become bloated & slow during the coding process. 

STAND ALONE REQUIREMENTS:
  Must enforce a range limit for grid selection and piece placement
  Actively auditing the DOM requires some interassociation betwen board class and DOM elements.
  Must associate all occupied squares of a placed ship. This will require inter-relational obj components({coord: [0,0], left: null, right: [1,0], down: null, up: [0,1]}). 
  