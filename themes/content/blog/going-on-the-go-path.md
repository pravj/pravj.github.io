+++
date = "2014-11-01T00:00:00+05:30"
title = "geopattern : going on the Go path"
description = "First visit to the Golang park with geopattern"
tags = ["Golang", "geopattern", "GitHub", "Open Source"]
+++

> You should have a look at [geopattern](https://github.com/pravj/geopattern), if you haven't yet.

### What's the buzz all about?
This blog post is about development of *geopattern* library in *golang*.

---

What do you think about this my favorite colored *concentric circle* pattern?

<figure> <img src="/images/concentric-circle.png"> 
	<figcaption>Concentric Circle Pattern</figcaption>
</figure>

### geopattern. What?
Umm, actually I don't know exactly why the name is *geopattern* but I know what it is.

It is a *golang* library that generates pretty image patterns. It comes with awesome pattern types like nested squares, tessellation, concentric circles, and [13 more](https://github.com/pravj/geopattern#available-pattern).

Now if you are thinking, why I don't know the reason behind its naming. It's because *geopattern* is actually the golang port of *my friend and GitHubber* [Jason Long](https://github.com/jasonlong)'s [GeoPattern](https://github.com/jasonlong) Ruby library.

*Jason* created the original Ruby library to power GitHub's [Guides](https://guides.github.com/) and [Explore](https://github.com/explore) sections.

### Another geopattern. Why?
As you can see the original *geopattern* is being used at GitHub itself. *What else do you want, huh?*

There are many other [implemetations](https://github.com/jasonlong/geopattern#ports) in different programming languages, trying to help users of each language choice.

> But this was not the real force for me to develop one more in golang.

Before *geopattern*, the last thing I worked on was [Doga: HTTP log monitoring console for Humans](https://github.com/pravj/Doga). I really loved developing it and still love to just watch it working.

The reason behind this special attraction is that :

* It helped me landing a summer internship at [Datadog](https://www.datadoghq.com/).
* It is written in Python. **<3**.

Then I started writing blog for an old project [teamwork](https://github.com/pravj/teamwork), just for the sake of adding an entry to my archives but it's still in drafts.

I tried many things to kill my time :

* watched too much movies, more than too much *Animation movies*.
* tried to read one seventh of the entire internet; I just missed it, though.
* collected some best music and shaped it in a playlist named *confusion* on Muzi, so was I.
* managed to complete reading one entire research paper, *first time \o/.*
* attempted watching Coursera content for two courses.
* tried to work on something new but got stuck somewhere and paused the work.
* managed to contribute to term2048, *only one right thing.*

> In short I was doing everything but there was no sign of satisfaction; *getting philosophical, lol.*

That's why I decided to write something. And here comes the *geopattern.*

### Golang. Why?
> Please don't kill me, if you use 'go' more than 'golang'. I'm just being formal.

Since this summer I was collecting talks, blogs and other sources etc. about use of different programming languages in the wild. I hope someday I'll be able to convert that all in something readable.

Golang was on my list ever since.

I have seen many awesome products shifting their infrastructure from [Python](https://www.spacemonkey.com/blog/posts/go-space-monkey), [Node.js](http://www.quora.com/Why-did-Koding-switch-from-Node-js-to-Go) to *golang*. Even Dropbox [migrated](https://tech.dropbox.com/2014/07/open-sourcing-our-go-libraries/) part of their code stack to golang from Python. Also I have read the *TJ holowaychuk* [praising](https://medium.com/code-adventures/farewell-node-js-4ba9e7f3e52b) golang.

All this made me to take a walk in the *golang* land.

### Learning Golang. Developing geopattern.
In starting I spend two evenings reading about formal language convention stuff on the [Golang-Book](http://www.golang-book.com/).

After playing for a while in my *~/projects/learn.go/* directory, I started working on *geopattern*.

I love to read source code of every readable thing in any language except assembly, *as far as I can understand it*. So I started reading source code of original *library* and it was fun. The most helpful thing was Jason's blog [Generating visual designs with code](https://medium.com/@jasonlong/generating-visual-designs-with-code-62e59c4881ca).

In starting I was having problems that I even googled *go sucks*. Because I found that *golang* is a bit more verbose language. It doesn't have some generic things so you have to write some work around like absense of optional arguments in functions and a better way to manage classes and stay object oriented.

But the more I worked with it I found that I'm more aware about what I'm writing, debugging is hell lot easy and what not.

Things that helped me from not giving up, are :

* [Go by Example](https://gobyexample.com/)
* [How to use interfaces in Go](http://jordanorelli.com/post/32665860244/how-to-use-interfaces-in-go)
* [Godoc: documenting Go code](http://blog.golang.org/godoc-documenting-go-code)
* And the *Holy Internet*.

I mailed Jason asking permission to port it and some other stuff related to licensing. His reply was positive. *That's the ideal way you port something.*

Then I called an astrologer for the right time to post about *geopattern* on [Hacker News](https://news.ycombinator.com/item?id=8520961) and Holy, mother of bull!, He was perfect. It went to 2nd rank on the front page. #ThanksHN \o/.

> All this happened a bit fast. In a week or so.

### Now What?
I hated and then loved working with *golang; still loving*.

As you can see, people are using *golang* to speed up their projects and scale them upto higher levels. So now I wish to understand more about it. I haven't smoked *golang's concurrency primitives - Go routines and Channels yet*.

It was awesome to see *geopattern* [leading](https://twitter.com/jasonlong/status/527465160253132803) GitHub's trending repositories.

I have noticed that I'm not good in managing my past works like some inspiring people do in the GitHub community. It's mainly because I move myself to some other stuff *totally* and don't pay much attention to older ones.

I'll try to work on this and learn more things about *golang*.

> If you want to answer the question I asked in the start, you can use the *Internet of things* to catch me. \o/.
