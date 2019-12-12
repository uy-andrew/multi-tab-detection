# Multi Tab Detection
Used to detect multiple tabs being opened. Same tab is defined as having [the same origin policy](https://en.wikipedia.org/wiki/Same-origin_policy#Origin_determination_rules). InPrivate/Incognito tab is treated as a different instance and won't be considered in the multi tab detection of the non (InPrivate/Incognito) tabs. Same origin in the InPrivate/Incognite is considered as its own multiple tabs. In theory, it means you can have 2 separate multi tab detection (one for normal tab and one for InPrivate/Incognito tab) for the same origin.

## Inspiration
The idea behind this multi tab detection is based on the [stack overflow answer](https://stackoverflow.com/questions/23690666/check-if-my-website-is-open-in-another-tab#43291970) of [Sasi Varunan](https://stackoverflow.com/users/4146454/sasi-varunan) on how to check if a website is open in another tab:
```javascript
<script type="text/javascript">
    // Broad cast that your're opening a page.
    localStorage.openpages = Date.now();
    var onLocalStorageEvent = function(e){
        if(e.key == "openpages"){
            // Listen if anybody else opening the same page!
            localStorage.page_available = Date.now();
        }
        if(e.key == "page_available"){
            alert("One more page already open");
        }
    };
    window.addEventListener('storage', onLocalStorageEvent, false);
</script>
```

## How to Use
* Instantiate **MultiTabDetection** at the beginning of your website.
* Subscribe to either or both **NewTabDetectedEvent** and/or **ExistingTabDetectedEvent**.
* You can also call the method **NumberOfTabsOpened** to get the number of tabs opened.

## API
### Constructor
var multiTabDetection = new MultiTabDetection();

### Events
*NewTabDetectedEvent*
> Informs the listener that a new tab has been detected for the same browser session. It also pass in the total number of tabs opened for the same browser session.

*ExistingTabDetectedEvent*
> Informs the listener that an existing tab existed for the same browser session.

*ClosedTabDetectedEvent*
> Informs the listener that a tab for the same browser session has been closed. It also pass in the updated total number of tabs opened for the same browser session.

### Properties
*NumberOfTabsOpened*
> Gets the total number of tabs opened. It is recommended to wait for 1 second after receiving existingTabDetectedEvent before calling this property to get the accurate total number of tabs opened.

## Sample Implementation
You can find sample implementation of this node module in [**multi-tab-detection-samples**](https://github.com/uy-andrew/multi-tab-detection-samples).

## Versions
Version | Release Notes
------- | -------------
1.1.0   | Fix issue where sometimes it does not count properly the correct total number of tabs opened in succeeding tabs. 
1.0.3   | Fix number of tabs opened count not working **(Non-Working Version)**
1.0.2   | Downgrading the typescript so that it can be compatible with Angular 8 application **(Non-Working Version)** 
1.0.1   | Fix the README not showing properly in npmjs website **(Non-Working Version)**
1.0.0   | Initial Commit **(Non-Working Version)**

## Author
[**Andrew Uy**](https://github.com/uy-andrew)

## License
Copyright © 2019, [Andrew Uy](https://github.com/uy-andrew).
Released under the [MIT license](https://github.com/uy-andrew/multi-tab-detection/blob/master/LICENSE).
