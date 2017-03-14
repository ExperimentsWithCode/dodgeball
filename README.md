# Dodgeball

### Live Site
http://MeirGalimidi.com/dodgeball

## Overview
Dodge the incoming dodgeballs for as long as you can. The chance of a ball being thrown gradually increases with time. Hold down the arrow keys, or WASD keys to control your character, and use the spacebar too in order to double your speed.   

## Technologies
* Javascript
* Canvas
* HTML5
* SCSS

## Technical Implementations

### Difficulty and variety
* In order to have varying difficulty and variety, the dodgeball spawn rate is adjustable. The number of dodgeballs that can be spawned per frame are set by the difficulty selected by the user. The chance that a ball is spawned that frame is automatically adjusted per frame by 0.00001%. This percent chance is displayed to the user in rounded form, as the level.

* When spawned, dodgeballs are set to the same dx speed as the standard speed of the Player. Their dy speed is set to randomly generated single digit number between 0 and 5. This ensures a more focused forward movement, and can be used as a point adjusted for future tweaks to difficulty. The y-cord is set to random percentage of canvas height.


* The dodgeball interactions are set to only transfer dy speed. It provides a more avoidable, predictable environment for the Player. In order to minimize traveling entanglements, the game runs at 64 frames a second [1]. In order to minimize spawn entanglements, a collision check is run before placement, and skipped if a collision is eminent.


[1] If the general speed of the game is increased this will be revisited.
