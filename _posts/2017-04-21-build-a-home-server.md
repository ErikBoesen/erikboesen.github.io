---
layout: post
title: "Build a Home Server"
date:   2017-04-21 19:36:55 -0400
categories: tech programming
photo: https://pbs.twimg.com/media/C2aOd1bXEAABT_1.jpg:large
---
Running a personal server is an excellent idea for even casual programmers. It allows you to be able to easily offload constant tasks like running a chatbot, ~~a botnet C&C server,~~ or even a website, all of which would be inconvenient if not impossible to run on one's personal laptop or other computer. Many people turn to using a VPS to run services like these. While that's definitely a good solution for some situations -- such as hosting a high-traffic website -- running a server at home is often a superior option for several reasons:

* Cost. A VPS with only 512MB RAM can cost five dollars per month, or 60 dollars per year. Running your own server costs essentially nothing.
* Control. As sysadmin, you control everything and don't have to be beholden to a company if you want to switch to a non-standard distribution, mess with your hardware, etc.
* Coolness. This isn't a real reason, but it's pretty neat to have a whirring box sitting in your study. Take that, Digital Ocean.

During this post, I'm going to be guiding you through a process I used to set up my home server and explaining my own configuration. You do not have to set anything up the way I did. This is just what works for me. I encourage you to experiment and figure out what works best for you.

## Finding a server
You really don't need a top-of-the-line server rack or an ultra-powerful overclocked gaming-quality PC to run a home server. The computer I use is an [HP Compaq dc5750 Microtower](http://h20564.www2.hp.com/hpsc/doc/public/display?docId=emr_na-c01383214) with 2GB of RAM and an 80GB HDD. Definitely not top of the line, but for what my server is used for, it works more than well enough. I highly recommend using a desktop tower rather than a laptop.

For those who don't have a computer to use: I've noticed a surprisingly large number of people have an old PC sitting around in an attic or otherwise unused. By just asking around to my neighbors several years ago, I got a couple PCs that people had no use for and had simply not had an opportunity to dispose of. After a little while, I had the idea to industrialize the process, and posted to OurCommonPlace, a now-defunct website which allowed citizens to post notices, invitations, questions, and items they were selling to be viewed by people in their town. I asked if anyone had old computers they were willing to pass on to me for research and experimentation, and promised to properly recycle anything I didn't need (and did). I collected at least 20 computers over the course of a few months.

More recently, I did the same thing on [NextDoor](https://nextdoor.com), which is still active, and in just a week, accumulated 16 assorted computers -- about 50/50 between laptops and desktops. Several didn't have hard drives, unfortunately, but at least 10 were in working condition.

I ended up giving away most of the computers after messing with Linux on them and playing with their hardware, but I kept one to use as my primary laptop for a few years, and another to use as my personal server.

## Setting up your hardware
For running your server, you'll need these supplies:
* The server tower itself
* Power cable
* Ethernet cable - CAT 6 or 7 are faster
* Your router nearby

For setup, you'll temporarily need these:
* Monitor
* HDMI, VGA, or other cable for monitor connection
* Power cable for monitor
* Keyboard
* DVD or USB drive for installing the operating system

If you need to buy an ethernet cable, I'd recommend one like [this](http://www.ebay.com/itm/Monoprice-7FT-30AWG-Cat5e-350MHz-UTP-Flat-Copper-Ethernet-Network-Cable-Black-/371232207336?hash=item566f29f1e8:g:SYYAAOSwBahVd1iZ); although you can usually find one lying around somewhere.

I recommend using a monitor and keyboard from another computer temporarily, since you won't be needing either once you finish setup.

Plug your power cable into your server and the wall. Then use your ethernet cable to connect the server to your router directly (it will be much, much faster than relying on wireless). Plug in your keyboard (assuming it's wired) and connect your monitor via whichever port you desire. Then plug in the monitor to the wall, and you should be good to go.

## Choosing an OS and a distribution
This is where your setup will very likely vary from mine. I'd advocate very strongly that you use Linux on your server; there's not really any good reason not to. For the rest of this tutorial I'll assume you're using a Linux-based OS, or another \*nix system like FreeBSD.

Now, you must choose the Linux distribution to use. Let me give you a couple to choose from if you're stuck:

* Ubuntu is a popular Linux distribution for beginners. For this purpose, it's an okay choice. I wouldn't personally recommend it since almost all of its helpful features are in the GUI, which you won't be using. But it would work just fine if you wanted to use it. You can find out how to install Ubuntu [here](https://www.ubuntu.com/download/desktop/install-ubuntu-desktop).
* Debian is another very nice choice. It may help to think of it as a bare-bones version of Ubuntu, without many of its helpful features but with significantly less bloat in terms of preinstalled packages. For everyone but intermediate experience with Linux systems, I'd recommend Debian. It's simple and fits most peoples' needs well. You can download it [here](https://www.debian.org/releases/wheezy/installmanual). (During the installation you'll need to unselect all desktop environments when asked if you want to install extra packages. Since you'll only be using your server via remote terminal, you don't need this.)
* Arch Linux is my personal distribution of choice. It's very complicated to install and configure and I do not recommend it for new users, but if you can pull off the installation it's a truly amazing system. The distribution revolves around constant rolling updates and the system is designed with minimalist intent, and thus only includes those packages which are necessary to the system. Everything you need must be installed by you. This may bother some people, but I like it a lot. If you choose to go the Arch route, I recommend [this install tutorial](https://www.youtube.com/watch?v=Wqh9AQt3nho).

Other distributions you can try include OpenSUSE, CentOS, Fedora, Gentoo, etc.

Once you've got your distro of choice installed, proceed to the next section.

## Setting up your server
I assume you now have your server booted into a terminal window (you shouldn't have installed a desktop environment; if you did, uninstall it or start over). Type your username and password to log in.

### Setting up SSH
The first step you should take is to set up SSH. OpenSSH will allow you to connect to your server remotely by typing `ssh [your username]@[server's ip]` in the terminal of another computer. You will then be able to run commands and control your server remotely just as you would be able to if you had a keyboard and monitor plugged in directly.

Sound nice? Let's set it up.

The installation process is different depending on the distribution you chose. On a Debian or Ubuntu install:

    sudo apt-get install openssh-client openssh-server

On Arch:

    sudo pacman -S openssh
    systemctl enable sshd.socket  # Always start on startup
    systemctl start sshd.socket   # Start now

Next, add yourself to the list of users allowed to connect via ssh:

    sudo nano /etc/ssh/sshd_config

At the bottom of the file, add:

    AllowUsers user

Where `user` is replaced with your username.

Press `Ctrl+X` to exit and save the config.

Next, type:

    ip a

Or if that doesn't work:

    ifconfig

Find the IP following `inet` and beginning with `192.168.1.`. This is the IP you can use to access your server while connected to the same network as it.

Now, you should be ready to connect to the server via ssh. In the terminal on your personal computer, type:

    ssh user@192.168.1.XXX

Replace `user` with your username and `XXX` with the end of the IP you just found.

If all goes well, you should be logged in and have shell access from your own computer. You can now run commands remotely. To disconnect, type `exit` or press `Ctrl+D`.

(You can now disconnect your server's monitor and keyboard and put them away. You won't be needing them any more.)

If you want to set up SSH keys to remove the need to type your password while still ensuring a secured connection, follow [these steps](http://www.linuxproblem.org/art_9.html). This step is optional, but _highly_ recommended.

### Port forwarding
Now, you can connect from anywhere in your house, apartment, etc. to your server and run commands as if you were sitting in front of it. Pretty cool. But what if you could do it from anywhere in the _world?_

To be able to do this, you need to use port forwarding. Port forwarding will allow your server to be accessed from the internet directly without having to go through your router.

The process for setting up port forwarding varies slightly from router to router. I'll guide you through how it works on mine (a Verizon FiOS Gateway whose configuration is about the same as other FiOS routers), and hopefully you'll be able to figure out how to do it on yours.

First, open [192.168.1.1](http://192.168.1.1) in your browser. This is your router's IP, and you can use the control panel it offers to set up port forwarding, as well as other things. Sign into your router -- usually the username is `admin` and the password may be written on the router.

After you sign in, click "Port Forwarding" on the left sidebar. Search the page for those words if it's not there. In the first select box, choose your server. Then in the next one, choose "custom ports." Type in `22` (the SSH port), and click Add.

Now, from your server, type:

    curl ifconfig.co

This will tell you your public IP. You can now use this IP instead of `192.168.1.XXX` to connect to your server via from anywhere in the world.

(If you ever want to host a something over HTTP, you should also forward port 80. You can also purchase a domain and forward it to your IP so you only have to remember the domain and not deal with the IP, but that's beyond the scope of this tutorial.)

Finally, you may want to set up an SSH alias from your client computer. In `~/.ssh/config`, write the following:

    Host serv
        User yourusername
        Hostname yourserverip

Replace `serv` with whatever you want to call your server. Save and exit the config, and from your client computer:

    ssh serv

Again, replacing `serv` with whatever you called your server.

This is much more efficient than typing

    ssh user@XXX.XXX.XXX.XXX

every time you want to connect.

## Other setup
### `tmux`
Install `tmux` (Ubuntu/Debian: `sudo apt-get install tmux`, Arch: `sudo pacman -S tmux`). `tmux` allows you to keep processes running without you being constantly logged in from your client computer. To start a new session, type:

    tmux

into your terminal. Run whichever commands you like in the `tmux` buffer that appears on your screen. When you're done, press `Ctrl+B` and then `D` to disconnect. (Don't hold `Ctrl` when pressing `D`). Then you can disconnect from the server or do other things, and the process will continue running in the background. At any time you can reattach to it:

    tmux attach

(`attach` can be shortened to `a`.) If you want to see the `tmux` windows you have open, type

    tmux list-sessions

If you want to attach to a specific session:

    tmux attach -t X

where `X` is the number of the session of choice.

### Shell
I'd recommend using `zsh` combined with [`oh-my-zsh`](http://ohmyz.sh) rather than the default bash on your server (and, for that matter, on your client computer). That's just a personal choice, though. If you're curious, I use [this theme](https://github.com/ErikBoesen/erkbsn).

## Conclusion
A home server is a really helpful thing to have. I hope this tutorial has helped you set up your own server. If not, feel free to [Tweet at me](https://twitter.com/ErikBoesen) or email me with any questions.
