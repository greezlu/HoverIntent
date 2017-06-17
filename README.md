# HoverIntent
Activates **[positive]** callback when mouse speed is less then **[speed]** parametr  
Activates **[negative]** callback when mouse left **[obj]**
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
   Number (px\sec)
## Use
```javascript
new HoverIntent (div, showTool, hideTool, 500);

var Container = new HoverIntent (div, showTool, hideTool, 500);
```   
## Methods
### .deactivateListeners()
Removing current listeners from .obj

### .activateLListeners()
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
