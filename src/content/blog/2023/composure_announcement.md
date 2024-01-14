---
title: Announcing Composure Camera
pubDatetime: 2023-12-30T00:00:00.000Z
description: "My first app: a powerful RAW camera app for iPhone"
featured: false
draft: false
ogImage: "@assets/blog/2023/og_composure.jpg"
tags:
  - ios
  - app
  - announcement
  - camera
  - photos
  - swift
  - swiftui
---

_This post is an edited and expanded version of my
[Mastodon thread](https://mastodon.social/@rioog/111665343787724046)_

I made my first app - a RAW camera! As of today, it is available on the
[App Store](https://apps.apple.com/us/app/composure-camera/id6471194287)!

![Marketing image showing the Composure camera app"](@assets/blog/2023/og_composure.jpg)

It's completely free - my goal was to release an app by the end of the year, so
there's no business model. And despite a few App Store Review rejections -
a crash on iPad and issues with the permissions prompt, I was able to make it
just before my deadline.

Composure is written in Swift and a smattering of Metal for the live camera
effects, with the UI written almost entirely with SwiftUI.

I started in mid-September (after a false start in March), and running `cloc`,
I've apparently written 21,000 lines of Swift and 400 lines of Metal in that time.

## A 'fun' bug

During this, I've run into my fair share of bugs, there was one pretty memorable
one were the UI would stop updating after the switching cameras.

My camera `AVCapture` code is in a Swift `actor` to ensure that all camera
accesses are on a single thread. I did this after turning on full concurrency
warnings in preparation for Swift 6, and it took three attempts before I finally
got something I was happy with.

The app uses iOS 17's `@Observable` which tracks properties that are read by
SwiftUI Views, and schedules a view update when any of the accessed properties
are modified. When this occurs for any of the camera input properties, the
camera view updates the capture device.

However, since `actor` accesses are all async, it was possible for the view to
re-render before the `Task` completed. The camera needs to be put in an 'locked'
state before I can change its properties like exposure. When switching to a
different lens, this isn't possible - it has to wait.

So, the following series of events could occur:

- The user would change lens, and immediately after, try change exposure
- The camera would switch lens, taking a few hundred milliseconds
- `Observable`, tracking that change in exposure, would let the camera view update.
  In a `Task`, it would actually update the camera.
- The view update finishes before the camera switch finishes. The view has
  not yet read the camera exposure, so now, `Observable` believes the camera
  state isn't a dependency

After this, the view never updates again: you could try switch to manual exposure,
change ISO, focus distance, but the camera would no longer respond. And this
would happen randomly - if the capture device update was slightly too slow even
just once, you would have to force quit and re-open the app.

Observable is great because it updates your views only when the specific properties
you access change, but what I didn't realize what that this 'list' of dependencies
is re-calculated **after every single view update**.

It was only after I finally figured out that switching cameras and quickly changing
a property like exposure would consistently cause the bug, that I was able to fix
it. Before that, there were a few days of banging my head against the wall.

## Icon

When it came to the icon, I didn't have a single idea which I could use as a
jumping-off point. However, I was able to use ChatGPT and Dalle-3 to generate
a few dozen camera-themed icons, and was able to prompt it towards a direction
I liked: a mix of a human eye and a camera iris.

I didn't have any luck with refining it further, so I began drawing it as a
vector in Inkscape, making tweaks to the design as I went. Inkscape on macOS
is... not good. I had to use the Windows version and use screen sharing to draw
it, but I am happy with the final outcome. Realistically, it is as good as I
can make on my own without hiring a professional.

<figure>

![Dalle-3 output on left, showing several icons following the motif of an eye and a camera iris and a muted blue background. On the right is the final icon](@assets/blog/2023/composure_icon_dalle_final_sbs.jpg)

  <figcaption>
    Left: Dalle-3 output. Right: final icon, drawn in Inkscape
  </figcaption>
</figure>
