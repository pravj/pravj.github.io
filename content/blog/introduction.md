+++
date = "2014-05-23T00:00:00+05:30"
title = "Introducing modified-lanyon, Harry, and me"
description = "$ sudo service blog start"
tags = ["Jekyll", "Lanyon", "Plugin"]
+++

`Yes, you don't know me. Cool, I'm telling you that.`

> I am Pravendra. Developer at awesome [SDSLabs](https://twitter.com/sdslabs).

> Also a Computer Science undergraduate student at IIT Roorkee.

> When I'm not scrolling in sublime-text or vim, I am watching Discovery Channel :bowtie:

> I am a sincere reader and It feels nice to read about other's experiences in different fields.

> Sometimes it shows new things that you are not aware about.

`A thought of owning a blog have always excited me.`

My choice for a setup was `Jekyll` powered blog hosted with `Github Pages`, so I started searching for a cool Jekyll theme.

### [Lanyon](https://github.com/poole/lanyon)
Definition according to it's Developer [@mdo](https://twitter.com/mdo)
> Lanyon is an unassuming Jekyll theme that places content first by tucking away navigation in a hidden drawer. It's based on Poole, the Jekyll butler.

It's really a cool theme with pretty nice design and a Toggelable sliding sidebar to provide enough space for your content.

Themes avaiable on internet are generally meant to be used as it is or without any hesitation but I wanted something extra in the theme. I wanted to have tags for each post and post sorting according to tags.

One more thing was that original Lanyon theme serves fix posts on a page and provides pagination(customizable). So if you want to read first post, you have to manually visit all pages till you reach at last page.

Then an old chat with [@sm](https://twitter.com/leostatic) motivated me to do something on my own , he said :
> its never bad to develop a thing, if you are not copying something entirely.

### modified Lanyon
> [modified Lanyon](https://github.com/pravj/modified-lanyon) is the jekyll theme, I ended up while customizing original Lanyon.

Things I added to the original theme are :

* now it shows title, date and related tags for each post on main page

`It provides easy access to all posts`

* there is a section for all tags in posts, its lists all posts under each tag in archive.

`Reader can easily visit for each post under a tag.`

* there is a timeline section showing all posts sorted according to year of post, having latest post first in timeline.

`Clicking on a date of post opens the timeline section`

* I added support to have smileys in blog, for this I created a jekyll plugin [Harry](https://github.com/pravj/Harry)

`Using it, you can use all emojis available on the famous www.emoji-cheat-sheet.com`

### modifying Lanyon
> each change I did was done with Jekyll Plugins

[Jekyll](http://jekyllrb.com) have cool [plugin](http://jekyllrb.com/docs/plugins/) support that allow you to create custom generated content specific to your site.

according to Jekyll documentation :
> in your site's root directory inside `_plugins/` directory any file ending in `.rb` will be loaded before Jekyll generates your site.

* to change the index page rendering style, I used [Liquid](https://github.com/Shopify/liquid) Tags and Filters in index.html to show listing of all posts with title, date and tags. see it [here](https://github.com/pravj/modified-lanyon/blob/master/index.html)
* to list all posts under a particular tag :

>I created `tagger.rb`, placed it in `_plugins/`. it maps each tag in archive to related posts having that tag and let you use that mapped data via [site.pages](http://jekyllrb.com/docs/variables/#site-variables) variable. see it [here](https://github.com/pravj/modified-lanyon/blob/master/_plugins/tagger.rb)

* to create the archive timeline :

> I am using `timeline.rb` from this [tutorial](http://tech.pro/tutorial/1299/getting-started-with-jekyll-plugins), I reversed the data to show latest post first in timeline. see it [here](https://github.com/pravj/modified-lanyon/blob/master/_plugins/timeline.rb)

### Harry
> [Harry](https://github.com/pravj/Harry) is the jekyll plugin I developed, it lets you use any smiley from [emoji-cheat-sheet](http://www.emoji-cheat-sheet.com/) in your blog.

It was fun developing this, because I just love smileys. specially this :grinning:

It saves any valid smiley image in `public/smileys/` from [emoji-cheat-sheet](http://www.emoji-cheat-sheet.com/) and serve from here. more about using Harry can be found [here](https://github.com/pravj/Harry/blob/master/README.md)

### Problem with using Jekyll Plugins on GitHub Pages
Github Pages don't allow you to use plugins because of security reasons, so I am pushing only generated static files to [repository](https://github.com/pravj/pravj.github.io).

### Source Code
* [this blog](https://github.com/pravj/pravj.github.io)
* [modified-lanyon](https://github.com/pravj/modified-lanyon)
* [Harry](https://github.com/pravj/Harry)

### Depreciation
By the way, the theme that you are seeing right now, isn't the *modified-lanyon* theme.

You can read about the current theme's development, here. [A little paint over my webspace's design](http://pravj.github.io).
