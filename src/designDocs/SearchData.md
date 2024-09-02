Locations for calling grouped ship conditions:

1. miss and hit count -> attackHandling() LINE 335
2. check for multiple ships -> hitSearch() LINE 408
3. deleting array, hit, and miss info OR array length = 0 
      (multiShips = false) -> immediately after sinking ship
4. splicing array and targeting array[0] (multiShips = true) -> after sinking ship
  Updates last hit to be array[0]. Otherwise hitSearch() should do the leg work..
5. 



