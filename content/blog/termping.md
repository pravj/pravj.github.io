+++
date = "2014-07-27T00:00:00+05:30"
title = "termping : <3 + Node.js + Streams + CoffeeScript"
description = "The game of Pong for terminals, built with Streams"
tags = ["Node.js", "CoffeeScript", "Game", "Hack", "Terminal"]
+++

> You should have a look at [termping](https://github.com/pravj/termping.git), if you haven't yet.

### What's the fuss about
This Blog is all about development of a game(kind of) [termping](https://github.com/pravj/termping.git), which is a prototype of one of the oldest video game [Pong](https://en.wikipedia.org/wiki/Pong).

> But this prototype runs in your system's [terminal](https://en.wikipedia.org/wiki/Computer_terminal)

<figure> <img src="/images/termping.gif">
	<figcaption>termping in action</figcaption>
</figure>

### Emergence
> One thing that I just feel, I am getting good at is
**"reading and understanding other people's code"** *&#35;notprasingmyself*

In this summer I have explored unlimited repository out there on [GitHub](https://github.com/pravj). some for solving any kind of issues I was facing in using them or some for just sake of learning anything new, be it any new language(Ruby) or a new field(Vim) for me.

One interesting recap is that I was working on a project for my team([SDSLabs](https://twitter.com/sdslabs)) and I was using a ruby library as HTTP client, [Rest-Client](https://github.com/rest-client/rest-client). I started facing issue(obviously) as I was new to Ruby. So I started reading code of Rest-Client just to take a look that what are the ingredients and their quantity in this library.

finally I completed Rest-Client with a better understanding that solved all my issues with it and gave me introduction to a new field, which is :
> How does HTTP and REST clients works

Also while learning about the large world of **[Vim](https://github.com/pravj/dotfiles/tree/learning/vim)**, I started developing on a rough idea in my mind. which was to develop a Pong like game, playable in Vim editor itself. I tried it, under the name of [vingvong.](https://github.com/pravj/vingvong). But I was unable to complete it because Vim does not support Asynchronous subprocesses, so I stopped the development.

May be you have any other way of implementing same or I'm wrong somewhere. If so, please let [me](https://twitter.com/hackpravj) know.

In the same mission, one day I was going through project [nshell](https://github.com/visionmedia/nshell) of *one and only* **[visionmedia](https://github.com/visionmedia)**. I selected this repository because I recently developed an interest in [bash, shells and dotfiles management](https://github.com/pravj/dotfiles).

I saw, he was using [Stream](http://nodejs.org/docs/latest/api/stream.html#stream_stream) in nshell development. I googled about streams and found many resources, this includes [official stream docs](http://nodejs.org/docs/latest/api/stream.html) and [stream-handbook](https://github.com/substack/stream-handbook) and many others.

Before that day, I have seen many people starring the *stream-handbook* in my GitHub feed. But I was like *this thing does not belongs to me, right now*.

But that day I opened *stream-handbook* with a motive to learn something. I started reading it and found that *Streams* is a nice topic to learn.

Suddenly my mind searched something from it's index and showed me result in form of an idea. It was :
> Why don't you just restart that Pingpong thing with this Stream ?

> That's all I wanted.


### Development
when I started thinking about Developing, shaping it as a **Node Module** was the only and right option. I knew already that writing a Node Module in **CoffeeScript** is both fancy(for world) and easy(for me).

There was another reason for Choosing CoffeeScript, my experience in CoffeeScript was only limited to write [some](https://gist.github.com/pravj/2f500607d0aa1bae26a2) hubot scripts for customizing internal communication at [SDSLabs.](https://github.com/sdslabs)

I was a cool opportunity to learn and do more things in CoffeeScript, so finally I was like :
> OK, lets move with CoffeeScript.

One coolest thing is that for CoffeeScript, I have only used [The Little Book on CoffeeScript](http://arcturo.github.io/library/coffeescript/), no StackOverflow here.

The current version of **termping** is open-sourced at [GitHub](https://github.com/pravj/termping), feel free to contribute to it.

Now I'll try to explain Source Code of **termping.**

Here is the current file structure of the repository, once you browse it.

```
.
|__.npmignore
|__src
| |__objects.coffee
| |__game.coffee
| |__movement.coffee
| |__status.coffee
| |__source.coffee
|__Cakefile
|__bin
| |__termping
|__package.json
|__.gitignore
|__README.md
|__docs
| |__termping.gif
```

PS : this tree structure is generated from [treegen](https://github.com/pravj/dotfiles/blob/learning/bin/treegen), my own attempt as the alternative of the great `tree` command.

you can see, main things are inside `/src` directory.

#### 1. objects.coffee
Object class keeps the game objects, including *ball*, *paddle* and *data* to be rendered on screen. It also helps to populate the data initially according to terminal size.

#### 2. game.coffee
Game class combines all available things at one place and makes it possible to play the game. It also invoke things in other classes on some particular events like *left*/*right* or *SpaceBar* key press, that enable pause/resume or movement of paddle.

#### 3. movement.coffee
Movement class handles all movement related things. Ex. moving of user's paddle, movement of ball, movement of computer's paddle and one most useful thing *Collision Detection*.

#### 4. status.coffee
status.coffee carries all variable and their values that different classes use throughout the game. which includes, velocity of ball, paddle positions, ball positions, state of game etc.

#### 5. source.coffee
Source class is leading character in the movie. This is the place where all that Stream thing shows the magic. What it does is to **pipe** the data to the **stdout** that is to be rendered on screen. That's why I named it as Source. Other classes just work together and periodically update the data.

### Learning
> finally the thing is that, was this all worth doing ?

Answer is : **Obviously, Yes. It's always good to be pragmatic.**

* Now I feel as good with **CoffeeScript** as I feel with my love, **Python**.
  * as the Book says, CoffeeScript is a little language, but it's pretty cool one.
* Finally I have a [NPM Module](https://www.npmjs.org/package/termping) under my name \m/.
  * I have completed things in form of NPM modules 2-3 times but never published them, because I developed them for internal/local use only.
* I continued working on it, because I just wanted to complete that un-complete [vingvong](https://github.com/pravj/vingvong) thing.
  * Finally now, the revenge has been taken, **Yo**.
  * It was the motive to complete it, that's why I have added that ♥ in starting, instead of adding it in last.

### Extra Learning
> Extra learning just means, things that I explored while developing it.

* **termping** is entirely developed in **Vim**, ***you can smell it***.
* **Git** repo in **termping** uses a pattern in it's [commit messages](https://github.com/pravj/termping/commits/master).
  * **Commit messages uses a Prefix with them, which is**
  * **add** : when your commit is adding something new to the repository.
  * **change** : when your commit is changing something that already exists.
  * **remove** : when your commit is removing things from the repository.
  * **fix** : when commit fixes something wrong with repository.
  * **update** : when commit updates version info about repository.
* Commit messages respects everything [suggested](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) by the great man of *Vim World*, [Tim Pope](https://github.com/tpope)

### Contribution
**termping** is still not complete, what you can contribute is :

* A scoring thing, that counts score and decide winner when one player reach at score limit.
* A level thing, that divides the game in parts depending on level of difficulty.
* Feel free to open any [issue](https://github.com/pravj/termping/issues) or [Pull requests](https://github.com/pravj/termping/pulls) with a feature you want there.

I am not directly writing any more code to it right now, because I have to get involved with some other necessary things, but I will try to helps anyone interested.

**It was a great journey so far, with nice learning experience.**
