# battleship

Live: https://amauget.github.io/battleship/

First and foremost, this codebase is messier than a college dorm room.
At the time of writing this, battleship has been complete (more or less) for 8 months, and there is a drastic difference in my codebase architecture now.

That said, I'm tremendously proud of this project, as the search functionality was quite an intensive design that required much whiteboard time.
If you click the link at the top of the hosted page, you'll see a demo of all the programmed search capabilities. 

A quick summary of it's search capabilities:
    randomized sweep - sweep search begins in one of four patterns to prevent stacking ships at one point of the board
    process of elimination - once the shortest remaining ship sinks, the search gap grows by 1 (default gap = 2. If destroyer sinks, gap = 3)  
    cluster detection - if another ship is hit while searching for the current, it'll delay the new target until the current target sinks.

Ironically, anyone who figures out the metrics and rules of this system can easily establish a 55% probablity of winning against it.

I theorize that the optimal search pattern would involve a randomized coordinate that is audited to ensure it meets the metric of the process of elimination gap value. Perhaps some day I'll prove it. Thank you for reading!
