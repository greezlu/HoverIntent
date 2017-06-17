# HoverIntent


## Use
```javascript
new HoverIntent (div, showTool, hideTool, 500);

var Container = new HoverIntent (mainContainer, showTool, hideTool, 500);

Container.speed = 1000;
Container.positive = showAnotherTool;
Container.negative = hideAnotherTool;
Container.deactivateListeners();
Container.activateListeners();
Container.changeTarget(newDiv);
```

```javascript
HoverIntent (obj, positive [, negative, speed])
```
### obj
DOM Object
