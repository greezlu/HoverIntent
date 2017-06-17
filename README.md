# HoverIntent
Activates **[positive]** callback when mouse is on **[obj]** and it's speed is less then **[speed]** parameter   
Activates **[negative]** callback every time mouse left **[obj]**  
Callback functions always gets **EventObject** as first argument  
Speed is in pixel\second
```javascript
HoverIntent (obj, positive [, negative, speed])
```
## Parametrs
### obj
   DOM Node Object
### positive
   Function
### negative
   Function
### speed
   Number  
## Use
```javascript
new HoverIntent (div, showTool, hideTool, 500);

new HoverIntent (div, showTool, 500);

new HoverIntent (div, showTool);

var Container = new HoverIntent (div, showTool, hideTool, 500);

```   
## Methods
### .deactivateListeners()
Removing current listeners from .obj

### .activateListeners()
Add current listeners to .obj if they were removed

### .changeTarget(newTarget)
Remove listeners from current target and add listeners to the new one   

## Local Variables
### .speed
Tracing speed in px\sec

### .positive
Callback function

### .negative
Callback function
