/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import "RNSocialAuthManager.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeAlert
                                                                                       | UIUserNotificationTypeBadge
                                                                                       | UIUserNotificationTypeSound) categories:nil];
  [application registerUserNotificationSettings:settings];
  [application registerForRemoteNotifications];
  [RNSocialAuthManager application:application didFinishLaunchingWithOptions:launchOptions];
  
  
  NSURL *jsCodeLocation;

  
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"circuit2"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  //    NSLog(@"did recieve local not %@", notification);
  
  
  
}
-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  const unsigned char *dataBuffer = (const unsigned char *)[deviceToken bytes];
  
  NSUInteger          dataLength  = [deviceToken length];
  NSMutableString     *hexString  = [NSMutableString stringWithCapacity:(dataLength * 2)];
  
  for (int i = 0; i < dataLength; ++i) {
    [hexString appendFormat:@"%02lx", (unsigned long)dataBuffer[i]];
  }
  
  NSLog(@"DEVICE TOKEN %@", hexString);
  
}
-(void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
     NSLog(@"ERROR %@", error);
}

- (BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RNSocialAuthManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

@end
