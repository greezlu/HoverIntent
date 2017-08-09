# HoverIntent
```javascript
HoverIntent (obj, positive [, negative, sensitivity])
```
[Preview](https://greezlu.github.io/HoverIntent/preview/)
Activates **[positive]** callback considering mouse parameter   
Activates **[negative]** callback if **[positive]** was activated and mouse left the **[obj]**  
Preview can seen here: 
- Callback functions always gets **EventObject** as argument
- Sensitivity is in *pixel/second*
- Default sensitivity is *500*
## Parameters
### obj
    HTML Object
### positive
    Function
### negative
    Function
### sensitivity
    Number  
## Use
```javascript
new HoverIntent (div, showTool, hideTool, 500);

new HoverIntent (div, showTool, 500);

new HoverIntent (div, showTool);

var Container = new HoverIntent (div, showTool, hideTool, 500);
```   
## Methods
### .deactivate()
Removing current listeners from target
### .activate()
Add current listeners on target (if they were removed)
### .changeTarget(newTarget)
Remove listeners from current target and add to the new one   
#### newTarget
    HTML Object
## Local Variables
### .sensitivity
Tracking speed in *pixel/second*
### .positive
Callback function
### .negative
Callback function
### .target
Contains the current **HTML Object** which is tracked. Not writable
