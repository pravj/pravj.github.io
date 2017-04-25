+++
date = "2015-04-23T00:00:00+05:30"
title = "Development story of puzzl"
description = "Intelligent version of the classical sliding puzzle game"
tags = ["Golang", "AI", "Game", "Terminal", "Hack"]
socialsharing = true
+++

Lets start with that old promotion rant I use all the time.

> You should have a look at [puzzl](https://github.com/pravj/puzzl), if you haven't yet.

### What this is all about?

This post is about development of a sliding-puzzle game I made recently, named *puzzl*. I refer it as an *intelligent version* of the classical sliding puzzle game, and I'll explain the reason behind this. Stay awake.

<figure> <img src="/images/puzzl.gif"> 
	<figcaption>Puzzl in action</figcaption>
</figure>

### For What Joy?

> Yes, that's the best question. Why did I do that?

There *is* a force behind everything we do, so the same goes for any new software product we see in the jungle or a new medicine or whatever.

They all try to solve some problems. A new version of a software has some bugs fixed from the older one and so on.

> But hey! you can develop a game without such force anytime.

Specially, when you are supposed to study for your exams. Tested, *rule of thumb*.

### Exam-time bamboozlement

> The *session* when your mind's *stream* is *grep*ing too many *event*s.

You feel like, put this exam thing in left and consider this problem-*blah*, because the world needs you. Right now.

It's gone after a nice sleep, like hangover. But it may attack you again on the next exam day, depending on your performance in last exam.

You think about too many things, however some are out of your domain though.

For example, *A bicycle for old aged people*. I found it an actual problem by the way, as I often see them having trouble riding the native big bicycles.

Then you think that it should run on its own, so you draw a sketch and invest your time in adding solar panels at proper orientation, so that charging is not something to worry about, no matter where the sun is.

Then you suddenly realize that you're about to transform into *Tony Stark*. You're working on a problem which comes under *Mechanical Engineering*. And there is no chance you can complete this without either having a degree in it or a girlfriend from that stream. By the way, both the solutions are difficult.

> A similar bamboozlement was the reason behind the game *puzzl*.

I was setting up my camp for the mid-term exam of *Artificial Intelligence* course. And then I stumbled upon this *sliding-puzzle* game thing in book.

Then I thought, what about a sliding-puzzle game for terminals?

That's it. I was done with further preparation. I even spent the entire exam time divising the *scoring mechanism* and *logo* for the game. The last page of the solution paper and my low score is the proof.

### The problem statement

*Sliding-puzzle* games have many variants. I decided to move ahead with the one having a 3x3 board, the *8-puzzle*. 8 out of 9 tiles have some numbers on them, one tile is blank.

All you have to do is, arrange all tiles in a particular order. Lets say, in increasing order with the blank tile being the last one.

<figure> <img src="/images/states.jpg"> 
	<figcaption>8 puzzle game states</figcaption>
</figure>

This sounds a little easy, taking user inputs, moving the tiles accordingly and checking that whether we are done with the game or not. So, I decided to enhance both the development and playing processes.

To solve the game in background and track user moves accordingly or give them hints. Poor humans.

### The solution

The solution is pretty simple actually. There is a blank tile in the game board and you can reach to a different configuration by moving that blank tile in atmost 4 directions, according to its current position.

Now, how do you make a computer solve this, efficiently?

This can be reduced to a problem where any game board configuration is a *node* and you can reach to a *node* from its *parent node* by applying a *successor function*, which is the movement of the blank tile in this case.

So, this is a *graph search problem* now. You have a *start state* and you have to reach at a *goal state* in minimum steps.

In *puzzl*, the algoirthm which solves this *graph search problem* is [A* algorithm](http://en.wikipedia.org/wiki/A*_search_algorithm). As of now, it uses the easiest *Heuristic Function*, [Misplaced Tiles Count](http://en.wikipedia.org/wiki/Heuristic_function).

The auto solving part sounds pretty easy, right? Like a walk while eating a cake.

> But there were some other interesting challenges.

### Primary Language

I opted for Golang as the primary language of *puzzl*, just because *I'm loving it* and I wanted it to takeoff comparatively faster than other solutions, let's say Python.

After some work, I started getting ideas of other features and I was happy with my language choice, as Go is the best solution I can think of for them. I'll talk about those features in a while.

### Solvability of the problem

This is one of those interesting parts I faced while making it.

> Not all 8- puzzle game configurations are solvable.

Yes, for a 3x3 game board, there are a total of 362880 configurations possible(9!), but only half of them are actually solvable.

Initially it took me a while to get it that why only some of them are solvable? But after going through "*Notes on the 15 puzzle*" paper by *Wm. Woolsey Johnson and William E. Story* it was clear to me.

Using the *Mathematical Induction* on what it was there in the paper, I have a sample game for you. You can spend rest of your life solving this, if you want to.

<figure> <img src="/images/unsolvable-game.jpg"> 
	<figcaption>Unsolvable sliding puzzle</figcaption>
</figure>

Then I added a package named [scanner](https://github.com/pravj/puzzl/blob/master/scanner/scanner.go) in the game, with the help of "*Analysis of the Sixteen Puzzle*". It makes sure that any game configuration we are using, is really solvable. It uses another for the game, if one is not actually solvable.

### Notification System

And this was the most interesting part. Developing a *Real time Notification System* according to the game state.

When I was done with writing the auto-solving background process for the game, I noticed that sometimes it takes a while to solve from the initial game configuration.

For example, the hardest game configuration is solvable in 31 moves. So, when the game is solving it, it doesn't properly respond to user inputs.

It won't respond in this way because the control flow architecture is *Synchronous* now. It means that firstoff the game will solve itself in background and then stars accepting user inputs.

And this goes worse when the game is solving itself on each move because user input was wrong. A serious problem it was.

> Here comes the concurrency primitives of Golang.

Concurrent programming is the beauty in Go. The language comes with built-in weapons, *goroutines* and *channels*.

The solution works like this, we have to change the control flow architecture into *Asynchronous* mode. Where the game would be notifying us that *OK, now I'm done with solving and you can give any input*, and avoiding all user inputs gracefully till then without a crash.

And this can be used in many other aspects, notifying on a particular internal event. Like *the game is complete*, *you just did a right/wrong move*, *there are no hints left* etc.

There are two *goroutines*, one for [handling the notification events](https://github.com/pravj/puzzl/blob/master/surface/surface.go#L406-L417) and another for [solving the game in background](https://github.com/pravj/puzzl/blob/master/surface/surface.go#L406-L417), both are non-blocking in nature to other routines like *user inputs*, *game display* etc. A *channel* named [Tunnel](https://github.com/pravj/puzzl/blob/master/notification/notification.go#L19) was the messenger for these *goroutines*.

<figure> <img src="/images/architecture.jpg"> 
	<figcaption>Asynchronous Gouroutines Architecture</figcaption>
</figure>

This is like feeding each other. Best friends forever.

### Game Interface

Thanks to [Box-drawing characters](http://en.wikipedia.org/wiki/Box-drawing_character), the best old way to develop text based user interfaces. And thanks to [termbox-go](https://github.com/nsf/termbox-go), an awesome library for such interface development in Golang.

### arXiv submission

I loved working on it so much that I even framed its development in shape of a research paper, sort of. It's available on the arXiv digital library, here [arxiv-1503.08345](http://arxiv.org/abs/1503.08345).

*Implementing an intelligent version of the classical sliding-puzzle game for unix terminals using Golang's concurrency primitives.*

It's not in LaTeX, so the arXiv stamp is absent in PDF format there. They replied that they don't have any technique yet to stamp other formats. I'll probably port it in LaTeX one day.

### Reference

1. [Notes on the 15 puzzle](http://www.jstor.org/stable/pdf/2369492.pdf?acceptTC=true)
2. [Analysis of the Sixteen Puzzle](http://kevingong.com/Math/SixteenPuzzle.html)
3. [ai-php.com](http://ai-php.com/wp-content/uploads/2013/12/AI8pzzle.jpg) for the 8-puzzle game states image
4. [Abhay Rana](https://captnemo.in/) for teaching me what *For What Joy* is. #FWJ?

### Behind the scene

I framed all this story for you, the truth is something else.

> Guess what? It's my exam-time again that made me write this.

The source code for *puzzl* is on [GitHub](https://github.com/pravj/puzzl). Do whatever you want, just respect licensing and other respectful things.
