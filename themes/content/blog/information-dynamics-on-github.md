+++
date = "2017-02-08T00:00:00+05:30"
title = "Information Dynamics on the GitHub Network"
description = "Exploring the 'social coding' behavior"
tags = ["GitHub", "Open-Source", "Data", "Hacker News"]
socialsharing = true
+++

> **Exploring the "social coding" behavior.**

Social groups have a system of behaviors occurring within the group or between groups, called “Group dynamics”. GitHub, being a social coding network, is the host to millions of developers and software projects. This report will use openly available data to unveil such behaviors in an intellectual-focused social network.

---

### Social Coding

The growth of GitHub has been significantly different from other OSS communities such as [Alioth](http://alioth.debian.org), [Freecode](http://freecode.com), and [Savannah](http://savannah.gnu.org/). It has experienced an "explosive growth", defined as the "outburst-type". [(Yu et al. 2014)](http://yuyue.github.io/res/paper/crowdsoft2014.pdf)

The following chart demonstrates the growth of GitHub, Alioth, Freenode, and Savannah. It’s made by approximating the data points in the pictures (using [WebplotDigitizer](http://arohatgi.info/WebPlotDigitizer)) embedded in the above-mentioned paper.

<div>
    <a href="https://plot.ly/~octogrid/143/" target="_blank" title="oss-growth" style="display: block; text-align: center;"><img src="https://plot.ly/~octogrid/143.png" alt="oss-growth" style="max-width: 100%;width: 640px;"  width="640" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="octogrid:143"  src="https://plot.ly/embed.js" async></script>
</div>

We can notice that the GitHub has experienced a big leap in a short time. On the other hand, the growth of other communities gradually slows down after a period of rising. 

GitHub keeps promoting the "social coding" ideology, [Be Social](https://help.github.com/articles/be-social/). They have multiple social features such as *networking based on following developers*, *sharing based on repository forking*, and *watching a project's development* etc.

> The social features are the core factors behind this explosive growth of GitHub, setting it apart from other open source software communities.

---

### Distribution Channels

<div class="custom-quote">
  <h1 class="icon-quote-left"></i></h1>
  <p>
  	The worst thing to happen with your repository is, <i>nobody will see it</i>.
  	<span class="author">
  		- <a target="_blank" href="https://twitter.com/captn3m0">Nemo</a>
  	</span>
  </p>
</div>

By the way, even worse is that the [government will see it](https://news.ycombinator.com/item?id=10101469) and ask you to stop working on it.  

Whenever *a new repository is created*, *an issue is filed*, or *a pull-request is submitted*; there exist several mediums to notify interested users about it.

#### Internal distribution channels

* *Watch* a repository to get notified about the development and discussion.
* Discover interesting projects in the [Explore GitHub](https://github.com/explore) and [Trending](https://github.com/trending) sections.
* Find a repository in your public activity timeline if anyone from your network has *created*, *starred*, or *forked* it.

#### External distribution channels

* Find a repository in the manually or algorithmically crafted digest emails.
* Locate a repository outside of the GitHub; on Hacker News, Reddit, Twitter, or blogs etc.

A user *starring* a repository can propagate it to his/her direct (first-degree) followers. If anyone from those connections *stars* the repository, it has the chance to appear in the activity feed of their followers and so on…

> If someone disconnected (without any connection to the creator) stars a repository, we can say that it has traversed far away in the network or *gone viral*.

---

### Contribution of external channels

External distribution channels have a significant impact on the popularity of a repository. They allow a repository to be viewed by *more* people compared to all the users it could have reached by the internal distribution channels of GitHub.

#### Hacker News

YCombinator's [Hacker News](http://news.ycombinator.com) is a news aggregator website focusing on *computer science*, *technology*, and *entrepreneurship*; known for its frontpage blessings. It has a dedicated section called [Show HN](https://news.ycombinator.com/showhn.html) to share something that you've made.

There have been [multiple](https://medium.com/@iamclovin/hacker-news-vs-product-hunt-a-launch-story-db18a23bc56a) startups [successfully](http://pitchpigeon.com/blog/10-lessons-learned-from-a-successful-hacker-news-launch.html) launching their products on Hacker News.

According to Paul Graham, the frontpage works in a self-protecting way, advertising what type of submissions are expected.

Now, *everyone wants to see their submission on the frontpage*. So in GitHub's context, they post about their repository on HN **as soon as** they open-source it.

For the following chart showing the *submission delay* (the difference between the time of a Hacker News submission and repository creation), I have collected submissions (linking to a GitHub repository) from the past 100 days.

<div>
    <a href="https://plot.ly/~octogrid/145?show_link=False" target="_blank" title="hn-delay" style="display: block; text-align: center;"><img src="https://plot.ly/~octogrid/145.png" alt="hn-delay" style="max-width: 100%;width: 640px;"  width="640" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="octogrid:145"  src="https://plot.ly/embed.js" async></script>
</div>

<!--hover trace-name-->

You can observe a *long tail* in the submission delay distribution. There are **3261** HN stories linking to a GitHub repository in these 100 days, with more than **33%** of them (**1078**) being posted in the **first week**, and **15%** in just **24 hours** of repository creation.

> It implies that people tend to use these external channels more often, to get visitors.

---

### Effect of internal and external distribution channels

Let's consider a recent trending repository [minimaxir/big-list-of-naughty-strings](https://github.com/minimaxir/big-list-of-naughty-strings), to compare the effect of *external* and *internal* distribution channels.

In the following chart, you can see the *stars* it has received every day since its creation.

<div>
    <a href="https://plot.ly/~octogrid/147/" target="_blank" title="minimaxir-repo-stars" style="display: block; text-align: center;"><img src="https://plot.ly/~octogrid/147.png" alt="minimaxir-repo-stars" style="max-width: 100%;width: 640px;"  width="640" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="octogrid:147"  src="https://plot.ly/embed.js" async></script>
</div>

You can easily notice **4 local maxima**, [corresponding to a Hacker News or Reddit submission featuring this repository](https://github.com/minimaxir/big-list-of-naughty-strings#social-media-discussions). It has scored relatively fewer *stars* on other days, except the day it was created.

If you're wondering why does it have almost 1000 stars on the day 1 before the first HN submission, *keep reading.*

##### While working with the Hacker News API, I found that repository had mentioned a wrong date for its first HN submission. So I created an [issue about the typo](https://github.com/minimaxir/big-list-of-naughty-strings/issues/142) mentioning this report. A circular linked list.

> In general, external channels have more impact than internal distribution channels.

#### How does it reach so far?

Now, let's consider another repository titled [pravj/Doga](https://github.com/pravj/Doga). I'm fortunate enough to have written it. You *can explore* how Hacker News had contributed to its *small success*.

I'm choosing this repository because it has relatively less number of stargazers, 229 precisely at the time of data collection. So it's easy to visualize them, still a little hard to make a responsive visualization given that it's my first *production level* encounter with D3.

The following interactive visualization demonstrates the "stargazers network" that contains the stargazers of this repository. You can *hover on a node* (user) to see its connected stargazers.

> The 'stargazer network' is a **directed graph** of all stargazers of the repository.
>
> There exist an edge (U<sub>i</sub> → U<sub>j</sub>) in the network **if** U<sub>i</sub> is following U<sub>j</sub> **and** has starred the repository **after** U<sub>j</sub> has starred (or created) it. 

The size of a node in a row is proportional to its **in-degree**, the number of users it *might have told* about the repository by starring it.

Users having a high in-degree (number of GitHub followers) have relatively high probability of spreading the news about the repository **inside the GitHub network**. Just like the repository creator did on his own, spreading it to a few users before the HN submission.

According to WSJ Graphics' [Anatomy of a hit](http://graphics.wsj.com/anatomy-of-a-hit/), **Audience size** is a key factor in the success of open source software. That's why *minimaxir* was able to spread his repository *big-list-of-naughty-strings* to more people before the first HN submission because he has more followers than me (@pravj).

<div class='chart'></div>

We can label the stargazers at network distance **N** as *disconnected stargazers* because they have no *following* relation to other users, **out-degree being 0** for them. There is a total of 139 such stargazers.

> Disconnected stargazers at network distance **N** don't have any successors, that means they have discovered the repository somewhere **out of the GitHub network**. 

---

### How do you get more visitors to your repository?

GitHub models user-actions on the platform as [various events](https://developer.github.com/v3/activity/events/types/), they *may* or *may not* appear in the public activity timeline based on the event types.

[MemberEvent](https://developer.github.com/v3/activity/events/types/#memberevent) is one such event, triggered when a user is added or removed as a collaborator to a repository or has their permissions changed. (GitHub API v3)

> Whenever a user U<sub>i</sub> adds another user U<sub>j</sub> as a collaborator to the repository R, all the followers of U<sub>j</sub> will receive it in their activity feed.

Let's relate it with "Influence Maximization" ([Kempe et al. 2003](http://www.cs.cornell.edu/home/kleinber/kdd03-inf.pdf)). It's a widely studied problem in social networks, trying to find a subset of users (seed users) to adopt a new idea or product to trigger a cascade of further adoptions via *social influence*. The problem is to *locate those seed users so that the total number of adoptions can be maximized*.

> As a solution to the problem, some GitHub users used to add most-followed users as collaborators. Because it would broadcast about the repository to all their followers, eventually getting more viewers to the repository.

<figure> <img src="/images/torvalds-broadcast.png">
  <figcaption>A repository being broadcasted to users in feed</figcaption>
</figure>

> A user U<sub>i</sub> adding another user U<sub>j</sub> to the repository R as a collaborator is a "collaboration spam" if U<sub>j</sub> has zero commits in the repository **and** U<sub>j</sub> does not follow U<sub>i</sub>.

##### It might give false positive results also, but overall it's a good method for the classification.

##### For example, if the repository has been deleted, it'll count that as a 'spam'.

The following chart shows how many times some popular users were the target of a **collaboration spam** (in a year).

<div>
    <a href="https://plot.ly/~octogrid/153/" target="_blank" title="collaboration-spam-vertical" style="display: block; text-align: center;"><img src="https://plot.ly/~octogrid/153.png" alt="collaboration-spam-vertical" style="max-width: 100%;width: 100%;"  width="100%" height="600px" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="octogrid:153"  src="https://plot.ly/embed.js" async></script>
</div>

You can feel how annoying it would have been for the popular users, especially for the most-followed **Linus Torvalds**.

##### To prepare this chart, a total of **3M MemberEvents** were collected from the BigQuery dataset. Then all the events adding Top-100 most followed users as a collaborator were filtered out for further processing. Finally, Top-10 users on the basis of the frequency of being targeted in spam are selected for a year.

The 'collaboration spam' [was a real problem](http://stackoverflow.com/questions/26224256/how-to-reject-remove-yourself-from-a-collaborative-github-repo). Finally, GitHub released [repository invitations](https://github.com/blog/2170-repository-invitations) to resolve it. Now you need to accept the invitations to let all your followers know about the repository.

<div>
    <a href="https://plot.ly/~octogrid/155/" target="_blank" title="collaboration-spam-timeline" style="display: block; text-align: center;"><img src="https://plot.ly/~octogrid/155.png" alt="collaboration-spam-timeline" style="max-width: 100%;width: 640px;"  width="640" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="octogrid:155"  src="https://plot.ly/embed.js" async></script>
</div>

> The 'repository invitation' feature has reduced the 'collaboration spam' on GitHub significantly.

<hr>

That's my exploration of the information dynamics on GitHub.

Well, I do have some questions unanswered. For now, I will keep them as **secret**. Also, I'm envious of the data people at GitHub, because they have access to much more data, I can only dream to have.

I am thinking of collecting additional data using some other ways, though I don't have the format ready now, just a thought. You can keep an eye on my [GitHub](https://github.com/pravj) to get the updates.

<hr>

> The source code for this report is available at [pravj/github-dynamics](https://github.com/pravj/github-dynamics).

#### Data Source

* [Hacker News API (Algolia)](https://hn.algolia.com/api)
* GitHub Archive dataset (BigQuery)

#### Visualization courtesy

* [Plotly](https://plot.ly)
* [D3](https://d3js.org/)