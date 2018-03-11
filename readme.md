# M-lang
This is a little project I've been working on to see if I could make a functioning interpreted programming language.

# Syntax
All statements must end in a comma. 

No capital letters allowed 

Space sensitive.

## Alloc
alloc [amount to allocate],

example: alloc 12,

Warning: Alloc must be done on the very first line!

## Int
int [address],[value/reference],

example: int 0,10,

example:int 1,$0,

## Add
add [address],[value/reference],[value/reference],

example: add 2,$0,$1,

## Print Line
pl [reference],

example: pl $2,