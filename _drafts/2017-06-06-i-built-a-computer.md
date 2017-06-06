---
layout: post
title: "I Built a Computer"
date:   2017-05-06 19:00:00 -0400
categories: tech programming
photo: /assets/img/post/mypc.jpg
---
For years I've been putting off building my own PC. There were a couple reasons for this:

* The last time I played any video games was seventh grade, and even then not with any great degree of intensity.
* My school provides me with a MacBook Air which is still relatively new and I thought I was fine with.
* I'm generally averse to buying things.

I still don't play any games, and am still quite conservative in terms of consumption of material posessions. But I eventually realized that continuing to use my small and restricted MacBook wasn't the best way for me to learn or develop my skills.

So, I caved.

I thought I'd share how I went through the process just in case anyone else out there is seeking to build a PC with a similar use case to me (predominaly for programming).

## The Hardware
I wanted a small tower which wouldn't get in my way too much and be easy to carry back and forth to CyberPatriot competitions. Since I don't game and thus don't need any kind of beefy graphics cards or other components, a Mini-ITX case wasn't too much to ask. I eventually settled in the [Corsair 250D](http://www.corsair.com/en-us/obsidian-series-250d-mini-itx-pc-case), which manages to fit everything I need with room to spare.

For a motherboard, I got a bare-bones MSI H81I. Nothing too fancy, but no complaints either.

I got one stick of Crucial 8GB RAM. I figured that keeping one slot open for another 8GB would be helpful should I ever need to upgrade.

I got an Intel Core i5-4460 processor, which offers all the power I need and wasn't too expensive.

I found a cheap CPU fan from Cooler Master which was similar to a stock Intel fan. This fan is extremely loud and after messing with Arch's `fancontrol` utility for over an hour, I cannot figure out how to turn it down when the CPU is at standard heat. I may eventually upgrade to a more sophisticated cooler, but for now I'm going to stay with this one.

In looking for a power supply, I made a grave mistake. I found a Corsair CX550M for only $20 on eBay, but didn't notice it was marked as "untested" in the description despite being labeled as only "used." Turned out it was outright dead, so I had to spend $35 at Micro Center on a Thermaltake 500W PSU. It's non-modular, which is pretty inconvenient as I need very few of the attached cables. But I'm dealing with it for now.

## The Software
I tend not to be a fan of Windows and nonfree software, and again don't play any video games, so opting with a GNU/Linux distribution was a no-brainer in this case. I chose Arch Linux, and couldn't be happier with my decision. Though I've run the distro on my server for months, this is the first time I've had a chance to use it with a desktop environment on a computer of my own. I love the incredible customizability of the distribution as well as the rolling update system.

I'm currently using GNOME 3, though I'm planning to eventually switch to another desktop environment. Though this isn't a persistent issue, I was annoyed by the amount of bloat in the `gnome-extra` package. There were a good 20 games installed, along with a todo list, calendar, and other things I doubt many people need by default.

![My desktop](/assets/img/post/desktop.png)
