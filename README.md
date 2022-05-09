# NativeScript Social Share (Version 2)

This version of NativeScript Social Share is similar to existing versions, however it includes the ability to retrieve a completion callback for iOS and Android!

This is particularly useful for capturing analytics, for example, to work out the sharing method that was used.

Or to trigger a workflow once the user returns to the app.


## Installation

Run the following command from the root of your project:

```
ns plugin add nativescript-social-share-v2
```

## Getting Started

To use the social share module you must first `require()` it. After you `require()` the module you have access to its APIs.

```JavaScript
// ------------ JavaScript ------------------
var SocialShare = require("nativescript-social-share-v2");

// ------------- TypeScript ------------------
import * as SocialShare from "nativescript-social-share-v2";
```

### API

#### shareImage(ImageSource image, [optional] String subject)

The `shareImage()` method expects an [`ImageSource`](http://docs.nativescript.org/ApiReference/image-source/ImageSource.html) object. The code below loads an image from the app and invokes the share widget with it:

```JavaScript
// ------------ JavaScript ------------------
var SocialShare = require("@nativescript/social-share");
var imageSourceModule = require("@nativescript/core");

var image = imageSourceModule.fromFile("~/path/to/myImage.jpg");
SocialShare.shareImage(image);

// ------------- TypeScript ------------------
import * as SocialShare from "@nativescript/social-share";
import { ImageSource } from "@nativescript/core";

let image = ImageSource.fromFile("~/path/to/myImage.jpg");
SocialShare.shareImage(image).then(result => {
    // Callback result.
    console.log(result.completed);          // Boolean - Did the user share?
    console.log(result.activityType);       // String/null - Sharing Method.
    
}).catch(err => {
    // There was a catastrophe...
    console.log(err);
})
```

You can optionally provide a second argument to configure the subject on Android:

```JavaScript
SocialShare.shareImage(image, "How would you like to share this image?").then(result => {
    // Callback result.
    console.log(result.completed);          // Boolean - Did the user share?
    console.log(result.activityType);       // String/null - Sharing Method.
    
}).catch(err => {
    // There was a catastrophe...
    console.log(err);
})
```

#### shareText(String text, [optional] String subject)

The `shareText()` method expects a simple string:

```js
SocialShare.shareText('I love NativeScript!');
```

Like `shareImage()`, you can optionally pass `shareText()` a second argument to configure the subject on Android:

```js
SocialShare.shareText('I love NativeScript!', 'How would you like to share this text?');
```

This also returns a promise and is thenable, so the callback result can be captured in the same manner as the shareImage example.


#### shareUrl(String url, String text, [optional] String subject)

The `shareUrl()` method excepts a url and a string.

```js
SocialShare.shareUrl('https://www.nativescript.org/', 'Home of NativeScript');
```

You can optionally pass `shareUrl()` a second argument to configure the subject on Android:

```js
SocialShare.shareUrl('https://www.nativescript.org/', 'Home of NativeScript', 'How would you like to share this url?');
```

This also returns a promise and is thenable, so the callback result can be captured in the same manner as the shareImage example.

## Security

If you discover a security vulnerability within this package, please send an email to Bespoke Technology Labs at hello@bespoke.dev. All security vulnerabilities will be promptly addressed. You may view our full security policy [here](https://github.com/BespokeTechLabs/nativescript-social-share-v2/security/policy).


## License

The NativeScript Social Share V2 Library is licensed under [The Apache 2.0 License](LICENSE).


## Credits

- @LewisSmallwood - Bespoke Technology Labs
- @NativeScript - The NativeScript community
