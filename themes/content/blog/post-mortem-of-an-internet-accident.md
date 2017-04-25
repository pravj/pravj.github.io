+++
date = "2015-01-11T00:00:00+05:30"
title = "Post-mortem of an Internet Accident"
description = "Finding 'good known' GitHub projects with maximum programming languages"
tags = ["GitHub", "Quora", "Data", "Python", "R"]
+++

Hi scout, thanks for visiting this node of the Holy Internet Graph; Before the combination *Internet Accident* confuse you, let me decode its meaning in the context of this post.

> Encounter with something on an edge node of the Holy Internet.


So this post is all about my attempt to solve a question, I saw on *Quora*.

> [What good known projects on GitHub uses the largest number of programming languages?](http://www.quora.com/What-good-known-project-on-GitHub-uses-the-largest-number-of-programming-languages)

And I think that my answer is 98.76% correct, respecting the *No-Zero-Redundancy* law.

I saw this question while jumping between my chrome tabs when I was struggling with old drafts of my blog.
I clicked the link to give it a separate tab; *even questions have self respect*.

I stumbled upon it as I saw that the question had a topic named *GitHub* also.

So, to answer this, all I had to do was to find a repository which uses highest number of programming languages in it.

> Wait, the question also says a *"good known project"*.
> Now that's a plot twist.

*GitHub* provides an excellent [REST API](https://developer.github.com/v3/), so excellent that it powers some awesome services also, like the [Gitter](https://gitter.im).

Now, to look for languages statistics of a repository you need the names of the repository and its owner. Then you can check a repo's languages statistics using.

> https://api.github.com/repos/{owner}/{repo}/languages

*As far as a I know, there is not any way to do a reverse lookup, where you just provide number of programming languages and it gives you all the associated repositories.*

So I thought, lets give up on it and enjoy the coffee, *I had one on my desk*.

I closed the question tab and started enjoying the coffee but then I opened it again because I felt that there may be a chance, if I use the *GitHub Archive* project.

> GitHub Archive is a project to record the public GitHub timeline, archive it, and make it easily accessible for further analysis.

This shift in plan was also not enough as *GitHub Archive* gives only the major programming language for a project.
Now it was the time to shift to coffee *full time* but *Nope! I had another idea*.

The idea was to collect *good and known* projects of *GitHub* and rank them according to no. of programming languages in them. This sounds like *Brute Force* but it was the only way left.

I headed towards the *GitHub API* for it but found that they gives you the first 1000 search results only.

So I moved to *GitHub Archive* finally and [downloaded a .csv file](https://github.com/pravj/Post-mortem/blob/master/bigquery.sql) of all the repositories with greater than equal to 500 stars. Now, I think it covers most of your *good and known projects*, happy now?

I *Vimed* the .csv file and found that some URLs were missing the owner's name.

<figure> <img src="/images/vim-screenshot.png"> 
	<figcaption>Vim Screenshot</figcaption>
</figure>


> **:g/https\:\/\/github\.com\/\//d**
>
> I removed all the corrupted lines using this command.

If you're thinking that by removing lines, we won't consider these repositories then take a deep breath and don't think so, we will consider them, keep reading.

Then I wrote a *Python module* to interact with the *GitHub API*, named it *[postman](https://github.com/pravj/Post-mortem/blob/master/postman.py)*.
The *postman* uses *Authentication Token* from *GitHub* to prevent the *rate-limiting*.

I don't know how much did *postman* take in its task as I was attending my classes then.
But when I came back from class in the evening, I saw that *postman* was done with the task. *Wow, an obedient postman*.

*Right now if you search in GitHub for repositories having 500 or more stars, you will see around 7,200 results. So we have been doing this right so far as GitHub Archive [don't have](http://git.io/78eKDg) all the data*.

Once all the data is available, it's time to *rock 'n' roll*. [Rstudio](http://www.rstudio.com) is always there to help us.

Plotting the stars and languages distribution over all the repositories, we get this graph.

<figure> <img src="/images/stars-and-languages.png"> 
	<figcaption>Stars and Language distribution</figcaption>
</figure>

You can see that most of our good and known projects are in the bottom-left corner. Almost 90% of our repositories have less than 20,000 stars and 20 languages.

There is only one repository with more than 40,000 stars, which is the [twbs/bootstrap](https://github.com/twbs/bootstrap).

OK, let's come to the question again. I think ordering repositories according to their no. of programming languages will work.

> Top 25 projects by their no. of programming languages

* [leachim6/hello-world](https://github.com/leachim6/hello-world), languages : 82
* [ajaxorg/ace](https://github.com/ajaxorg/ace), languages : 58
* [ajaxorg/ace-builds](https://github.com/ajaxorg/ace-builds), languages : 58
* [RMerl/asuswrt-merlin](https://github.com/freebsd/freebsd), languages : 57
* [freebsd/freebsd](https://github.com/freebsd/freebsd), languages : 39
* [geany/geany](https://github.com/geany/geany), languages : 36
* [xbmc/xbmc](https://github.com/xbmc/xbmc), languages : 30
* [dspinellis/unix-history-repo](https://github.com/dspinellis/unix-history-repo), languages : 30
* [TechEmpower/FrameworkBenchmarks](https://github.com/TechEmpower/FrameworkBenchmarks), languages : 28
* [imatix/zguide](https://github.com/imatix/zguide), languages : 28
* [apache/thrift](https://github.com/apache/thrift), languages : 27
* [msysgit/msysgit](https://github.com/msysgit/msysgit), languages : 27
* [kennyledet/Algorithm-Implementations](https://github.com/kennyledet/Algorithm-Implementations), languages : 27
* [flycheck/flycheck](https://github.com/flycheck/flycheck), languages : 27
* [aichallenge/aichallenge](https://github.com/aichallenge/aichallenge), languages : 27
* [triAGENS/ArangoDB](https://github.com/triAGENS/ArangoDB), languages : 26
* [offensive-security/exploit-database](https://github.com/offensive-security/exploit-database), languages : 25
* [JuliaLang/julia](https://github.com/JuliaLang/julia), languages : 23
* [JetBrains/intellij-community](https://github.com/JetBrains/intellij-community), languages : 23
* [facebook/pfff](https://github.com/facebook/pfff), languages : 23
* [ornicar/lila](https://github.com/ornicar/lila), languages : 23
* [WebKit/webkit](https://github.com/WebKit/webkit), languages : 22
* [ariya/phantomjs](https://github.com/ariya/phantomjs), languages : 21
* [ruby/ruby](https://github.com/ruby/ruby), languages : 21
* [coolwanglu/vim.js](https://github.com/coolwanglu/vim.js), languages : 21

---

So, is that all? *Not at all! We have a lot to talk about my friend.*

Lets talk about something interesting I found in the data there.

</br>

### 1. There were 382 repositories without any programming language.

* Most of them are documentations, list of resources for a field.
* For example [vhf/free-programming-books](https://github.com/vhf/free-programming-books), List of free learning resources.

<figure> <img src="/images/zero-language-repository.png"> 
	<figcaption>Zero Language Repositories</figcaption>
</figure>


> Subject to the detection of language by GitHub.

*Along with the required dataset, I was also collecting the [logs](https://github.com/pravj/Post-mortem/blob/master/log/postman.log) data.
So, there is something more interesting.*

### 2. The log file shows 'ERROR : status 404' in some lines.

* There are 214 such lines, it means these projects have shifted their owners as it's unusual to delete such popular repository.
* They have evolved to much larger projects and have their own organizations now. For example the projects [Homebrew](https://github.com/homebrew/homebrew), [Docker](https://github.com/docker/docker) and [Jekyll](https://github.com/jekyll/jekyll), earlier they were [mxcl/homebrew](https://github.com/mxcl/homebrew), [dotcloud/docker](https://github.com/dotcloud/docker) and [mojombo/jekyll](https://github.com/mojombo/jekyll) respectively.
* The maximum-star-holder-and-ultra-awesome project [twbs/bootstrap](https://github.com/twbs/bootstrap) was earlier at *Twitter* by the address, [twitter/bootstrap](https://github.com/twitter/bootstrap).
* The one-and-only TJ Holowaychuk have changed his username from [visionmedia](https://github.com/visionmedia) to [tj](https://github.com/tj).

### 3. The log file shows 'ERROR : status 403' in some lines.

Now this is weird, as status 403 denotes the Forbidden state. But underlying secrets are much more awesome here.

1. There were two repositories, disabled due to a DMCA takedown notice.
  * [popcorn-official/popcorn-app](https://github.com/popcorn-official/popcorn-app)
  * [Bukkit/CraftBukkit](https://github.com/Bukkit/CraftBukkit)
2. There was one repositories which is disabled by GitHub staff.
  * [mandatoryprogrammer/Octodog_Invasion](https://github.com/mandatoryprogrammer/Octodog_Invasion)
3. There was one repository which is deleted.
  * [NULLPointerDz/test](https://github.com/NULLPointerDz/test)
  * Don't know how but this repository had more than 500 stars once.

---

The code for this report is on GitHub, [pravj/Post-mortem](https://github.com/pravj/Post-mortem).
 
> If you feel that you can do more after going through this post-mortem report, you are welcome to show your medical skills.
