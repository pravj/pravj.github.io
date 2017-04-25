+++
date = "2015-02-08T00:00:00+05:30"
title = "Introducing Penticons : The Hash Game"
description = "Identicons with better Collision resistance"
tags = ["Identicon", "Golang", "GitHub", "Hash", "Hack"]
+++

Jennifer Lawrence fan, huh? It was *The Hash Game* by the way. Still in? Kewl.


### What's the buzz all about?

Unfortunately, there is no buzz. This post is about development of [Penticons](https://github.com/penticons).

### Penticons. What?

Remember those [egg shaped profile pictures](http://a0.twimg.com/sticky/default_profile_images/default_profile_6_normal.png) on Twitter? They are automaticaly linked to your profile, when you forget to upload your custom profile picture.

Different services uses different default profile pictures. For example, Quora uses [this image](http://qph.is.quoracdn.net/main-qimg-caf2e843c5e4c9dfec11bf60f9e82ccb?convert_to_webp=true) of their co-founder Charlie Cheever.

In Internet's language, these profile pictures are called *Avatars*. They represents a particular user or object on the Internet.

As we have seen, Quora provides a single image as the default avatar. What if, you want to distinguish between users on the basis of their *avatars*?

This particular problem to recognize users or objects according to their *avatar* images was the main force behind the invention of [Identicons](http://en.wikipedia.org/wiki/Identicon).

> An Identicon is a visual representation of a **hash value**, uniquely\* mapped to any object on the internet.

*Penticons* are just another implementation of identicons. But it tries to solve a key problem with available identicons. Let's see how.


### Hash value. What?

Let's put this identicon thingy in the left and talk on something interesting.

Do you know, How do they store your password in the Facebook? Obviously you do, but in case you don't, let me confess something.

They have some guys sitting there, they remember all your passwords and match it to your input whenever you log in to the service. That simple it is.

Facebook also keeps a *hashed* version of your passwords, in case all those smart guys are on leave, they just *hash* your input again to match with their stored value. They log you in, if both of the values are same.

In case you are thinking, why do they *hash* your passwords? They do it to make sure that nobody really knows your passwords except those *smart and loyal* guys.


### Hash.. Hash.. What the Hash?

Let's fly back to the junior mathematics class and consider this tiny function.

<img src="/images/function.png"/>

Now, if I ask, what is the value of x when the value of function is 0? You can answer this easily by solving this simple quadratic equation. The values will be 2 and 1.

What if I change the function to a bit more horrible one. For example, take this.

<img src="/images/hard-function.png"/>

Feeling cold, huh? Well! you can still find the roots but with a bit more effort. One simple effort you can do is to *google* this equation and you'll find it on the very first result page.

The *Hash Function* we were talking about is one similar function that takes a value and returns the mapped value.

But in case of the *Cryptographic Hash Functions*, it's pretty hard to get back the *pre-image* of a function value, somewhat like the second function above.

Additionally, these *Hash Functions* are supposed to be *injective* in nature. Unlike the first function above, which has two roots 2 and 1. In reality they are not totally injetive, though.

[MD5](http://en.wikipedia.org/wiki/MD5) and [SHA-1](http://en.wikipedia.org/wiki/SHA-1) are two such *Cryptographic Hash Functions*.


### Any wrong with these Hash Functions?

Yeah! Let's consider the MD5 hash function.

It generates a 128 bit hash-value for any argument. In the text format, it's written as a 32 digit hexadecimal number.

For example, the word "alpha" results in, *2c1743a391305fbf367df8e4f069f9f9*

Can you guess, what is the maximum possible hash count MD5 can generate?

<img src="/images/md5-count.png"/>

So if you have more elements than this count to hash, MD5 would be producing similar hashes for all the extra elements.

This is the case when MD5 is pure as hell, but it's not actually.

There are many reports showing cryptographic weakness of MD5. For example, consider [this report](http://www.mathstat.dal.ca/~selinger/md5collision/).


### Why Penticons?

*Penticons tries to solve one key problem with available identicons.* Let me explain.

They are developed on top of the identicons that [GitHub provides](https://github.com/blog/1586-identicons). There are [many other](https://github.com/search?utf8=%E2%9C%93&q=identicon) similar identicon implementations available on GitHub.

Let's take an inside on How these identicons works.

They generates a 5x5 pixel sprites, where they choose to color some of the pixel and left rest pixels as blank, according to the hash of user's handle. They also have a vertical axis of symmetry, so the identicon is similar from left to right. Finally they color non-blank pixels with a color.

Now, what is the maximum number of identicons generated this way?

Suppose they are using 20 colors to fill in the non-blank pixels, they are [not using](https://github.com/cupcake/sigil/blob/6bf9722f2ae82f58a0c7d48daeb40ec844b78eae/server.go#L20-L29) this much colors, though. Then total possible identicon count will be :

<img src="/images/total-identicon.png"/>

On the other hand, *Penticons* uses [5 colors](https://github.com/penticons/penticons.go/blob/master/utils/utils.go#L21-L25) only, from GitHub's contribution calendar. They also have a vertical axis of symmetry.

But instead of using a fix color to fill in, it uses any one of the 5, according to the hash value. This way, total number of identicons will be the following.

<img src="/images/total-penticons.png"/>

Which is way more than other implementations, so the rate of collision is also less here.


### Now what?

I made an organization for [Penticons](https://github.com/penticons); just to look cool, though. I think so.

Last night, I wrote the [golang implementation](https://github.com/penticons/penticons.go) for *Penticons*. My friend [Nairitya](https://github.com/nkman) will be writing some more very soon, at-least he promised me. Let's see.

*Avatar* for the organization is a penticon itself, of the word "Penticons".

<figure> <img src="/images/avatar.png"> 
	<figcaption>Penticon Avatar for the word "Penticons"</figcaption>
</figure>


