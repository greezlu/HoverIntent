# HoverIntent
```javascript
HoverIntent (obj, positive [, negative, sensitivity])
```
Activates **[positive]** callback considering mouse parameter   
Activates **[negative]** callback if **[positive]** was activated and mouse left the **[obj]**  
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
### .deactivateListeners()
Removing current listeners from target

### .activateListeners()
Add current listeners on target (if they were removed)

### .changeTarget(newTarget)
Remove listeners from current target and add to the new one   
#### newTarget
    HTML Object
## Local Variables
### .sensitivity
Tracing speed in *pixel/second*

### .positive
Callback function

### .negative
Callback function
