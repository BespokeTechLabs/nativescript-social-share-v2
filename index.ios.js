import { Frame, Utils } from '@nativescript/core';
function share(thingsToShare) {
    return new Promise((resolve, reject) => {
        const activityController = UIActivityViewController.alloc().initWithActivityItemsApplicationActivities(thingsToShare, null);

        activityController.completionWithItemsHandler = (activityType, completed, returnedItems, activityError) => {
            return resolve({
                completed: completed,
                activityType: activityType,
                returnedItems: returnedItems,
                activityError: activityError
            });
        };

        const presentViewController = activityController.popoverPresentationController;
        if (presentViewController) {
            const page = Frame.topmost().currentPage;
            if (page && page.ios.navigationItem.rightBarButtonItems && page.ios.navigationItem.rightBarButtonItems.count > 0) {
                presentViewController.barButtonItem = page.ios.navigationItem.rightBarButtonItems[0];
            } else {
                presentViewController.sourceView = page.ios.view;
                presentViewController.permittedArrowDirections = -1 /* Unknown */;
                if (page && page.ios && page.ios.view) {
                    presentViewController.sourceRect = CGRectMake(CGRectGetMidX(page.ios.view.bounds), CGRectGetMaxY(page.ios.view.bounds), 0, 0);
                }
            }
        }
        Utils.ios.getVisibleViewController(getRootViewController()).presentViewControllerAnimatedCompletion(activityController, true, null);
    });
}
function shareSocial(type, text, url) {
    return new Promise((resolve, reject) => {
        const composeViewController = SLComposeViewController.composeViewControllerForServiceType(type);
        if (text) {
            composeViewController.setInitialText(text);
        }
        if (url) {
            composeViewController.addURL(NSURL.URLWithString(url));
        }
        composeViewController.completionHandler = (result) => {
            console.log(result);
            switch (result) {
                case 0 /* Cancelled */:
                    // ignore
                    break;
                case 1 /* Done */:
                    resolve();
                    break;
            }
        };
        Utils.ios.getVisibleViewController(getRootViewController()).presentViewControllerAnimatedCompletion(composeViewController, true, null);
    });
}
function getRootViewController() {
    const app = UIApplication.sharedApplication;
    const win = app.keyWindow || (app.windows && app.windows.count > 0 && app.windows.objectAtIndex(0));
    return win.rootViewController;
}
export function shareImage(image) {
    return share([image.ios]);
}
export function shareText(text) {
    return share([text]);
}
export function shareUrl(url, text) {
    return share([NSURL.URLWithString(url), text]);
}
export function shareViaTwitter(text, url) {
    return shareSocial(SLServiceTypeTwitter, text, url);
}
export function shareViaFacebook(text, url) {
    return shareSocial(SLServiceTypeFacebook, text, url);
}
//# sourceMappingURL=index.ios.js.map
